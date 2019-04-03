import React, { Component } from 'react';
import ClassNames from 'classnames/bind';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import styles from './index.scss';

const cx = ClassNames.bind(styles);

@observer
class index extends Component {
  render() {
    const { image } = this.props;
    return <img className={cx('img')} src={image} alt="screen" />;
  }
}
export default index;
