import React, { Component } from 'react';
import { observable, action } from 'mobx';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import { PageHead, Logo, Image } from '../components';

@observer
class index extends Component {
  @observable image = '';

  componentDidMount = () => {
    setInterval(() => {
      axios.get('/api/screen').then((res) => {
        this.image = res.data.img;
      });
    }, 500);
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
