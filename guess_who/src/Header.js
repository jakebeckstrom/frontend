import React, { Component } from 'react';
import { Header, Grid, Button, Segment, Dropdown, Input, Modal, Label, Divider } from 'semantic-ui-react';
import axios from 'axios';

const API = 'https://guess-who-server12.herokuapp.com';
// const API = 'http://localhost:3000'


export default class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      message: '',
      sets: [],
      processed: false,
      selected: false,
      uploadable: false,
      nameTaken: false,
      needName: true,
      needMoreFiles: true,
      needLessFiles: false,
      secretKey: '',
      auth: true,
      success: '',
      secretRKey: '',
      removed: '',
      rname: '',
      needRName: true,
    }
    this.handleReset();
    this.choose = this.choose.bind(this);
  }

  choose = (event, data) => {
    let choice = data.value;
    var req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ set: choice })
    };
    fetch(API + '/getImages/setChoice', req)
      .then(res => res.json())
        .then(data => console.log(data));
    this.setState({
      selected: true
    });
    data.value = null;
  }

  getAvailableSets = () => {
    fetch(API + '/getImages/getSets')
      .then(res => res.json())
        .then(data => {
          data.sets.forEach(element => {
            this.state.sets.push(element);
          });
        })
          .catch(err => console.log(err));
    this.setState({
      processed: true
    })
  }



  handleReset = async e => {
    await fetch(API + '/getImages/reset')
      .then(res => res.text())
        .then(res => console.log(JSON.parse(res).message))
          .catch(err => console.log(err));
      this.setState({
        sets: [],
        selected: false,
        processed: false,
        success: '',
        removed: '',
        auth: false,
        secretKey: '',
        secretRKey: '',
        uploadable: false,
        needRName: '',
        needName: true,
        nameTaken: false,
        needMoreFiles: true,
        needLessFiles: false
      }, this.getAvailableSets);
    }



    //Add Set functions

  validateUpload = () => {
    let names = this.state.sets.map((set) => {
      return set.value;
    })

    this.setState({
      nameTaken: (names.includes(this.state.message)),
      needName: (this.state.message === "" ),
      needMoreFiles: (this.state.images.length < 24),
      needLessFiles: (this.state.images.length > 24),
      uploadable: (
        !(this.state.images.length < 24) && !(this.state.images.length > 24) && !(this.state.message === "" ) && !(names.includes(this.state.message))
      )
    })
  }

  addImageSet = (event) => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    this.setState({
      images
    }, this.validateUpload);
  }

  setName = async (event, data) => {
    let message = data.value;
    await this.setState({
      message
    });
    this.validateUpload();
  }

  setKey = async (event, data) => {
    let secretKey = data.value;
    this.setState({
      secretKey
    })
  }

  uploadImages = e => {
      const data = new FormData();
      this.state.images.map((image) => {
        data.append("image", image, image.name);
      });
      data.append("setName", this.state.message);
      axios.post(API + '/getImages/uploadSet', data)
        .then(res => {
          let mes = res.data.Resp;
          this.setState({
            success: mes
          })
        })
            .catch(err => console.log(err));      
  }

  startUpload = e => {
    var req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secretKey: this.state.secretKey})
    };
    fetch(API + '/getImages/checkKey', req)
      .then(res => res.json())
      .then(data => {
        this.setState({
          auth: data.auth
        });
        if(data.auth) {
          this.uploadImages(e);
        } else {
          console.log('Not accepted');
        }
      })
        .catch(err => console.log(err));
  }


  //Remove set Functions

  validateRemove = () => {
    let names = this.state.sets.map((set) => {
      return set.value;
    })

    this.setState({
      needRName: !(names.includes(this.state.rname)),
    });
  }

  setRKey = async (event, data) => {
    let secretRKey = data.value;
    this.setState({
      secretRKey
    })
  }

  setRName = async (event, data) => {
    let rname = data.value;
    this.setState({
      rname
    }, this.validateRemove)
  }

  sendRemove = () => {
    var req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rname: this.state.rname})
    };
    fetch(API + '/getImages/removeSet', req)
      .then(res => res.json())
        .then(data => {
        let mes = data.Resp;
        this.setState({
          removed: mes
        })
      })
          .catch(err => console.log(err));
  }
  
  removeSet = () => {
    var req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secretKey: this.state.secretRKey})
    };
    fetch(API + '/getImages/checkKey', req)
      .then(res => res.json())
      .then(data => {
        this.setState({
          auth: data.auth
        });
        if(data.auth) {
          this.sendRemove();
        } else {
          console.log('Not accepted');
        }
      })
        .catch(err => console.log(err));
  }


  render() {

    return (
      <>
        <Grid>
          <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as='h1' textAlign='center'>Guess Who</Header>
            </Segment>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              {this.state.processed && (
              <Dropdown
                id="selector" 
                placeholder='Select Character Set'
                fluid
                search
                selection
                options={this.state.sets}
                onChange={this.choose}
                />)}
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={this.handleReset}>Reset</Button>
            </Grid.Column>
            <Grid.Column width={8}>
              <Modal 
                trigger={<Button>Upload New Set</Button>}
                size='large'
                onUnmount={this.handleReset}>
                  <Segment>
                  <Grid columns={2}>
                    <Divider vertical fitted hidden/>
                    <Grid.Row>
                    <Grid.Column>
                      <Segment attached='top'>
                        <Input
                          label='Name'
                          onChange={this.setName}
                          />
                          {this.state.needName && (
                            <Label basic color='red' pointing='left'>
                              Please enter a name
                            </Label>  
                          )}
                          {this.state.nameTaken && (
                            <Label basic color='red' pointing='left'>
                              Name is Taken
                          </Label>
                          )}
                          </Segment>
                      <Segment attached>
                        <Input
                          type='file' 
                          onChange={this.addImageSet} 
                          placeholder='Add Image Set'
                          multiple
                          />
                          {this.state.needLessFiles && (
                            <Label basic color='red' pointing='left'>
                            Too many files
                            </Label>
                          )}
                          {this.state.needMoreFiles && (
                            <Label basic color='red' pointing='left'>
                              Not enough files
                            </Label>
                          )}
                      </Segment>
                      <Segment attached>
                        <Input
                        label='Secret Key'
                        onChange={this.setKey}
                        />
                      </Segment>
                      <Segment attached='bottom'>
                        {this.state.uploadable ? (
                            <Button 
                              onClick={this.startUpload}>Upload</Button>
                          ) :(
                          <Button disabled>Upload</Button>
                          )}
                          {this.state.success !== '' &&
                          (<Label color='green'>{this.state.success}</Label>)}
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment attached='top'>
                        Remove Set{`\t\t`}
                        <Label basic color='red'>Warning: this cannot be undone</Label>
                      </Segment>
                      <Segment attached>
                        <Input
                          label='name'
                          onChange={this.setRName}
                          />
                          {this.state.needRName && (
                            <Label basic color='red' pointing='left'>
                            Set doesn't exist
                            </Label>
                          )}
                      </Segment>
                      <Segment attached>
                        <Input
                          label='Secret Key'
                          onChange={this.setRKey}
                          />
                      </Segment>
                      <Segment attached='bottom'>
                          {this.state.needRName ? (
                          <Button disabled>Remove</Button>
                          ) : (
                            <Button 
                              onClick={this.removeSet}>Remove</Button>
                          )}
                          {this.state.removed !== '' &&
                          (<Label color='green'>{this.state.removed}</Label>)}
                          
                      </Segment>
                    </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  </Segment>
                </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
