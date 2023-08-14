const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Link from 'next/link';
import Image from 'next/image'
import { Button, Carousel } from 'antd';
import { useRouter } from 'next/router';
import type { info, Person } from '../interfaces'
import Footer from '../components/footer'
import Header from '../components/head'
import PersonComponent from '../components/person'
import styles from './styles.module.scss';
import WordBlock from '../components/word-block';

// GetServerSideProps后面的类型可用不行
export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query
  const res = await fetch(`${apiUrl}/api/greeting`)
  const homeInfo = await res.json()

  const resData = await fetch(`${apiUrl}/api/data`)
  const homeResData = await resData.json();
  return { props: { homeInfo, homeResData, query } }
}
// 文字列表初始化
const WordList = [
  { id: 1, text: '案牍', x: 220, y: 150, size: 18 },
  { id: 2, text: '证据', x: 190, y: 266, size: 14 },
  { id: 3, text: '文书', x: 120, y: 315, size: 14 },
  { id: 4, text: '证据', x: 49, y: 266, size: 16 },
  { id: 5, text: '证据', x: 20, y: 150, size: 15 },
  { id: 6, text: '文书', x: 49, y: 33, size: 18 },
  { id: 7, text: '策略', x: 119, y: -15, size: 17 },
  { id: 8, text: '调查', x: 190, y: 33, size: 14 },
]

function homeIndex({ homeInfo, homeResData, query }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // console.log("------homeInfo, homeResData", homeInfo, homeResData)
  const router = useRouter();
  console.log("------query", query)

  const handleButtonClick = () => {
    router.push('/example')
  }
  return (
    <>
      <Header asPath='home' query={query} pageType='index' />
      <div className={styles.container}>
        <div className={styles.swapperWarp}>
          <div className={styles.swapper}>
            <Carousel dotPosition='bottom'>
              <div >
                <Image
                  src="/images/swper1.jpg"
                  alt="Picture of the author"
                  width={500}
                  height={300}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                /></div>
            </Carousel></div>
        </div>
        <div className={styles.yzconWarp}>
          <div className={styles.yzcon}>
            <div className={styles.yzconLeft}>
              <div className={styles.yzconLeftBt1}>法律工作一站式解决</div>
              <div className={styles.yzconLeftBt2}>疲于跳转切换的过去<br />在这形成一个整体</div>
            </div>
            <WordBlock Word={WordList} />
          </div>
        </div>
        <div className={styles.con1}>
          <h1 style={{ color: '#3e3e3e' }} ><span style={{ color: '#666' }}>{homeInfo.name} </span>website Welcome to our !{homeInfo.stargazers_count}</h1>
          {homeResData.map((item) => (
            <PersonComponent key={item.id} person={item} />
          ))}
          <Image
            src="/images/vercel.svg"
            alt="Picture of the author"
            width={100}
            height={100}
            priority
          />
          <nav>
            <Link href="">/introduce
              iIndexntroduce
            </Link>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default homeIndex


