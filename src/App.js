import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
export default class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLogin: false,
      isLoginFailed: false,
      isLoading: false
    }
  }
  login() {
    this.callAuthAPI(this.state.username, this.state.password)
  }
  callAuthAPI(username, password) {
    const body = {
      username: username,
      password: password
    }
    const config = {
      data: body
    };
    this.setState({ isLoading: true })
    axios(config)
      .then((res) => {
        console.log('response: ', (res.data));
        if (res.data?.status) {
          this.setState({ isLogin: true })
        }
        else {
          this.setState({ isLoginFailed: false })
        }
        this.setState({ isLoading: false })
      })
      .catch((err) => {
        console.log('error: ', err);
      })
  }
  render() {
    if (this.state.isLogin) {
      return (
        <login username={this.state.username}></login>
      )
    } else if (this.state.isLoading) {
      return (
        <div> Loading... </div>
      )
    } else {
      return (
        <Grid Container component="main" maxWidth="xs">
          <div style={{
            marginTop: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form style={{
              width: '100%',
              marginTop: 15,
            }}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label={'Username'}
                    value={this.state.username}
                    onChange={(e) => {
                      this.setState({
                        username: e.target.value
                      })
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label={'Password'}
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({
                        password: e.target.value
                      })
                    }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  margin="3,0,2"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => this.login()}>
                  LOGIN
                  </Button>
                {this.state.isLoginFailed
                  ?
                  <div> Incorrect username or password </div>
                  :
                  null
                }
              </Grid>
            </form>
          </div>
        </Grid>
      );
    }
  }
}