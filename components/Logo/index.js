import React, { Component } from 'react';
import ClassNames from 'classnames/bind';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import styles from './index.scss';

const cx = ClassNames.bind(styles);

@observer
class index extends Component {
  render() {
    return (
      <div className={cx('logo')}>
        <div className={cx('title')}>SCREEN</div>
        <div className={cx('description')}>Made by 김성뫼</div>
      </div>
    );
  }
}
export default index;
