import React, { Component } from 'react';
import { observable, action, runInAction } from 'mobx';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import { PageHead, Logo, Image } from '../components';

@observer
class index extends Component {
  @observable image = '';

  @action getImage = () => {
    axios.get('/api/screen').then((res) => {
      this.image = res.data.img;
      this.getImage();
    });
  };

  componentDidMount = () => {
    this.getImage();
  };

  render() {
    const { image } = this;
    return (
      <div>
        <PageHead title="발표" description="this is index page" />
        <Logo />
        <Image image={image} />
      </div>
    );
  }
}
export default index;
