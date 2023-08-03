import React from "react";

import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { footerLogo } from "../../public/images";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx("container")}>
      <div className={cx("container__wrap")}>
        <Image src={footerLogo} alt="푸터 로고" width={128} height={47} />

        <div>
          <div>
            <strong>국내 휴가지 정보를 제공합니다.</strong>

            <div className={cx("description-box")}>
              <p>
                (주)가고싶어 | 대표이사 김현주 | 서울특별시 서초구 서초대로25길
                55, 2층 201호(방배동)
              </p>

              <p>사업자등록번호 566-88-02715</p>
              <p>ⓒgagosipeo All rights reserved.</p>
            </div>
          </div>
          <div>
            <div>
              <strong>고객센터</strong>
              <ul>
                <li>이메일 : gagosipeo.com@gmail.com</li>
                <li>전화 : 02-1833-8604</li>
              </ul>
            </div>

            <div>
              <strong>약관</strong>
              <ul>
                <li>서비스 이용약관</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
