import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import classNames from "classnames/bind";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {
  appstoreBtn,
  content1Img,
  content1MobileImg,
  content2Img,
  googleBtn,
  icon1,
  icon2,
  icon3,
  mainImg,
  mainMobileImg,
  travelLogo,
} from "../public/images";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useScrollPosition from "../hooks/useScrollPosition";
import useWindowSize from "../hooks/useWindowSize";
import { sendContactEmail } from "../lib/api";

const cx = classNames.bind(styles);

export default function Home() {
  const position = useScrollPosition();
  const { width } = useWindowSize();

  const bannerRef = useRef<HTMLElement>(null);
  const serviceRef = useRef<HTMLElement>(null);
  const benefitRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLElement>(null);
  const downloadRef = useRef<HTMLElement>(null);

  const [data, setData] = useState({
    email: "",
    phone: "",
    content: "",
  });
  const handleDownload = () => {
    toast.error("준비중입니다.");
  };

  const handleScroll = (target: string) => {
    let offsetTop = 0;
    switch (target) {
      case "banner":
        offsetTop = bannerRef.current?.offsetTop ?? 0;
        break;
      case "service":
        offsetTop = serviceRef.current?.offsetTop! - 100 ?? 0;
        break;
      case "benefit":
        offsetTop = benefitRef.current?.offsetTop! - 100 ?? 0;
        break;
      case "question":
        offsetTop = questionRef.current?.offsetTop! - 100 ?? 0;
        break;
      case "download":
        offsetTop = downloadRef.current?.offsetTop ?? 0;
        break;

      default:
        break;
    }

    return window.scrollTo({
      behavior: "smooth",
      top: offsetTop,
    });
  };

  const handleSendEmail = () => {
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^0([0-9]{1,2})([0-9]{8})$/;

    try {
      if (!data.email.length) {
        return toast.error("이메일을 입력해주세요.");
      }
      if (!emailRegex.test(data.email)) {
        return toast.error("올바른 이메일을 입력해주세요.");
      }
      if (!data.phone.length) {
        return toast.error("연락처를 입력해주세요.");
      }
      if (!phoneRegex.test(data.phone)) {
        return toast.error("올바른 연락처를 입력해주세요.");
      }
      if (!data.content.length) {
        return toast.error("문의내용을 입력해주세요.");
      }
      if (data.content.length <= 20) {
        return toast.error("문의내용은 최소20자로 입력해주세요.");
      }

      sendContactEmail(data).then((a) => {
        setData({
          email: "",
          phone: "",
          content: "",
        });
        toast.success("문의가 완료되었습니다.");
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header
        isDefault={position < 100 ? true : false}
        onScroll={handleScroll}
      />
      <section className={cx("main-section")} ref={bannerRef}>
        <Image src={width > 992 ? mainImg : mainMobileImg} alt="메인" />
      </section>

      <div className={cx("triangle")}>
        <p>
          <strong>여행비용 때문에 고민</strong> 이라면?
        </p>
      </div>

      <section className={cx("service-section")}>
        <p>
          <strong>가고싶어 여행 경매가</strong>로
        </p>
        <p>떠나면 되지말입니다!</p>
        <Image
          src={width > 992 ? content1Img : content1MobileImg}
          alt="경매가 이미지"
        />
      </section>
      <section className={cx("travel-section")} ref={serviceRef}>
        <Image src={travelLogo} alt="여행로고 이미지" />

        <p>여행자 선경매 참여, 알뜰한 여행 즐겨보세요!</p>
        <p>
          온라인 자선경매에 참여한 <strong>낙찰금액은 단체에 기부</strong>
          됩니다.
        </p>
        <p>여행으로 따뜻한 마음을 나눠보세요!</p>
      </section>

      <section className={cx("promotion-section")}>
        <h1>다양한 프로모션 혜택</h1>
        <p>
          오직 가고싶어를 이용하는 고객을 위한 다양한 프로모션 혜택을 놓치지
          마세요!
        </p>
        <Image src={content2Img} alt="프로모션 이미지" />
      </section>
      <section className={cx("aircraft-section")} ref={benefitRef}>
        <h1>특별한 혜택</h1>

        <div className={cx("grid-box")}>
          <div>
            <Image src={icon1} alt="아이콘1" width={108} height={116} />

            <div className={cx("title")}>
              <strong className={cx("desktop")}>할인받고</strong>
              <strong className={cx("desktop")}>떠나자!</strong>
              <strong className={cx("mobile")}>할인받고 떠나자!</strong>
            </div>
            <div className={cx("description")}>
              <p className={cx("desktop")}>카드사별 특별한</p>
              <p className={cx("desktop")}>할인을 한눈에!</p>
              <p className={cx("mobile")}>카드사별 특별한 할인을 한눈에!</p>
            </div>
          </div>
          <div>
            <Image src={icon2} alt="아이콘2" width={125} height={106} />

            <div className={cx("title")}>
              <strong className={cx("desktop")}>국내호텔</strong>
              <strong className={cx("desktop")}>상시7%할인</strong>
              <strong className={cx("mobile")}>국내호텔 상시7%할인</strong>
            </div>
            <div className={cx("description")}>
              <p>항공권 구입 후 호텔 예약하면</p>
              <p>호텔 요금의 7% 할인</p>
            </div>
          </div>
          <div>
            <Image src={icon3} alt="아이콘3" width={123} height={118} />
            <div className={cx("title")}>
              <strong>액티비티</strong>
            </div>
            <div className={cx("description")}>
              <p>지유여행의 또 다른 즐거움</p>
            </div>
          </div>
        </div>
      </section>

      <section className={cx("question-section")} ref={questionRef}>
        <div className={cx("question-section__wrap")}>
          <p>
            가고싶어에 대하여{" "}
            <strong>궁금하신 점은 무엇이든 물어보세요.</strong>
          </p>

          <div className={cx("grey-box")}>
            <div className={cx("input-row")}>
              <label htmlFor="">이메일</label>
              <input
                type="text"
                placeholder="abc@gmail.com"
                value={data.email}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>

            <div className={cx("input-row")}>
              <label htmlFor="">연락처</label>
              <input
                type="text"
                placeholder="01012341234"
                value={data.phone}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="">문의내용</label>

              <textarea
                placeholder="최소 20자 이상 작성해주세요"
                value={data.content}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }));
                }}
              />
            </div>
            <button type="button" onClick={handleSendEmail}>
              문의하기
            </button>
          </div>
        </div>
      </section>
      <section className={cx("download-section")} ref={downloadRef}>
        <div className={cx("download-section__wrap")}>
          <div>
            <p>가고싶어 앱에서 </p>
            <strong>모든 서비스를 만나보세요</strong>
          </div>
          <div className={cx("download-list")}>
            <div className={cx("img")}>
              <Image
                src={appstoreBtn}
                alt="앱스토어 이미지"
                onClick={handleDownload}
              />
            </div>
            <div className={cx("img")}>
              <Image
                src={googleBtn}
                alt="구글플레이 이미지"
                onClick={handleDownload}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
