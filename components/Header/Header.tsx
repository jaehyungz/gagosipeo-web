import React, { useState } from "react";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import {
  closeIcon,
  footerLogo,
  logo,
  menuBlackIcon,
  menuIcon,
} from "../../public/images";

const cx = classNames.bind(styles);

type Props = {
  isDefault: boolean;
  onScroll: (target: string) => void;
};
function Header({ isDefault, onScroll }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        className={cx("overlay", { visible: visible })}
        onClick={() => setVisible(false)}
      />

      <div className={cx("sidebar", { visible: visible })}>
        <Image
          src={closeIcon}
          alt="닫기 아이콘"
          width={20}
          height={20}
          onClick={() => setVisible(false)}
        />

        <ul>
          <li
            onClick={() => {
              onScroll("banner");
              setVisible(false);
            }}
          >
            홈
          </li>
          <li
            onClick={() => {
              onScroll("service");
              setVisible(false);
            }}
          >
            서비스
          </li>
          <li
            onClick={() => {
              onScroll("benefit");
              setVisible(false);
            }}
          >
            혜택
          </li>
          <li
            onClick={() => {
              onScroll("question");
              setVisible(false);
            }}
          >
            문의하기
          </li>
          <li
            onClick={() => {
              onScroll("download");
              setVisible(false);
            }}
          >
            다운로드
          </li>
        </ul>
      </div>
      <div className={cx("container", { isDefault })}>
        <div className={cx("container__wrap")}>
          <Image
            src={isDefault ? logo : footerLogo}
            alt="로고"
            className={cx("logo")}
          />

          <ul>
            <li onClick={() => onScroll("banner")}>홈</li>
            <li onClick={() => onScroll("service")}>서비스</li>
            <li onClick={() => onScroll("benefit")}>혜택</li>
            <li onClick={() => onScroll("question")}>문의하기</li>
            <li onClick={() => onScroll("download")}>다운로드</li>
          </ul>

          <Image
            className={cx("menu-icon")}
            src={isDefault ? menuIcon : menuBlackIcon}
            alt="메뉴아이콘"
            width={20}
            height={20}
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
