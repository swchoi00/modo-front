let mockData = [
  {
    postNo: 1,
    category: '공지',
    title: '오늘은 휴무입니다.',
    writer: '관리자',
    view: 50,
    content: '오늘은 휴무입니다. 즐거운 시간 보내세요!',
    date: '2024-05-03'
  },
  {
    postNo: 2,
    category: '자유',
    title: '오늘의 일상 이야기',
    writer: '홍길동',
    view: 100,
    content: '오늘은 어떤 일이 있었나요? 함께 이야기해요.',
    date: '2024-05-03'
  },
  {
    postNo: 3,
    category: '일정투표',
    title: '주말 모임 일정 투표',
    writer: '김철수',
    view: 80,
    content: '다음 주 토요일에 모임을 갖기로 했습니다. 시간을 정해주세요!',
    date: '2024-05-03'
  },
  {
    postNo: 4,
    category: '가입인사',
    title: '신입 개발자 모집합니다.',
    writer: '이영희',
    view: 120,
    content: '우리 회사에서 신입 개발자를 모집합니다. 지원하세요!',
    date: '2024-05-03'
  },
  {
    postNo: 5,
    category: '공지',
    title: '중요한 업데이트 공지',
    writer: '관리자',
    view: 70,
    content: '서비스에 중요한 업데이트가 있을 예정입니다. 반드시 확인하세요!',
    date: '2024-05-03'
  },
  {
    postNo: 6,
    category: '자유',
    title: '오늘의 추천 영화',
    writer: '홍길동',
    view: 90,
    content: '오늘의 추천 영화를 소개합니다. 함께 관람해요!',
    date: '2024-05-03'
  },
  {
    postNo: 7,
    category: '일정투표',
    title: '월례 회의 시간 조정',
    writer: '김철수',
    view: 85,
    content: '다음 주 월요일 회의 시간을 조정해야 합니다. 의견을 나눠주세요!',
    date: '2024-05-03'
  },
  {
    postNo: 8,
    category: '가입인사',
    title: '인턴 채용 공고',
    writer: '이영희',
    view: 110,
    content: '우리 회사에서 인턴을 채용합니다. 자세한 내용은 공고를 확인하세요!',
    date: '2024-05-03'
  },
  {
    postNo: 9,
    category: '공지',
    title: '서비스 장애 안내',
    writer: '관리자',
    view: 75,
    content: '현재 서비스에 장애가 발생하였습니다. 빠른 시일 내에 해결하겠습니다.',
    date: '2024-05-03'
  },
  {
    postNo: 10,
    category: '자유',
    title: '최근 읽은 책 후기',
    writer: '홍길동',
    view: 115,
    content: '최근에 읽은 책의 후기를 나누어보려고 합니다. 함께 해주세요!',
    date: '2024-05-03'
  },
  {
    postNo: 11,
    category: '일정투표',
    title: '웹 개발 스터디 일정 조사',
    writer: '김철수',
    view: 95,
    content: '웹 개발 스터디의 다음 모임 일정을 정하기 위한 투표입니다. 의견을 남겨주세요!',
    date: '2024-05-03'
  },
  {
    postNo: 12,
    category: '가입인사',
    title: '경력 개발자 채용 공고',
    writer: '이영희',
    view: 105,
    content: '우리 회사에서 경력 개발자를 채용합니다. 지원서를 제출하세요!',
    date: '2024-05-03'
  },
  {
    postNo: 13,
    category: '공지',
    title: '신규 서비스 출시 예정 안내',
    writer: '관리자',
    view: 85,
    content: '저희 서비스의 신규 기능을 소개합니다. 기대해주세요!',
    date: '2024-05-03'
  },
  {
    postNo: 14,
    category: '자유',
    title: '오늘의 날씨 소식',
    writer: '홍길동',
    view: 120,
    content: '오늘의 날씨가 궁금하시나요? 함께 확인해봐요!',
    date: '2024-05-03'
  },
  {
    postNo: 15,
    category: '일정투표',
    title: '주말 모임 장소 선정',
    writer: '김철수',
    view: 100,
    content: '다음 주말 모임의 장소를 선정하기 위한 투표입니다. 참여해주세요!',
    date: '2024-05-03'
  },
  {
    postNo: 16,
    category: '가입인사',
    title: '인턴 채용 공고',
    writer: '이영희',
    view: 80,
    content: '우리 회사에서 인턴을 채용합니다. 자세한 내용은 공고를 확인하세요!',
    date: '2024-05-03'
  },
  {
    postNo: 17,
    category: '공지',
    title: '서비스 이용 안내',
    writer: '관리자',
    view: 110,
    content: '서비스 이용에 관한 안내사항입니다. 확인해주세요!',
    date: '2024-05-03'
  },
  {
    postNo: 18,
    category: '자유',
    title: '오늘의 일상 이야기',
    writer: '홍길동',
    view: 75,
    content: '오늘은 어떤 일이 있었나요? 함께 이야기해요.',
    date: '2024-05-03'
  },
  {
    postNo: 19,
    category: '일정투표',
    title: '다음 회의 시간 조정',
    writer: '김철수',
    view: 115,
    content: '다음 회의 시간을 조정하기 위한 투표입니다. 참여해주세요!',
    date: '2024-05-03'
  },
  {
    postNo: 20,
    category: '가입인사',
    title: '신입 디자이너 채용 공고',
    writer: '이영희',
    view: 90,
    content: '저희 회사에서 신입 디자이너를 채용합니다. 지원서를 제출하세요!',
    date: '2024-05-03'
  }

  // {
  //   postNo: 36,
  //   category: '자유',
  //   title: '자유롭게 이야기 나누는 공간',
  //   writer: '홍길동',
  //   view: 100,
  //   content: '이것은 자유롭게 이야기를 나누는 공간입니다.',
  //   date: '2024-03-29'
  // },
  // {
  //   postNo: 35,
  //   category: '질문·고민',
  //   title: '질문이 있습니다.',
  //   writer: '김철수',
  //   view: 80,
  //   content: '안녕하세요. 궁금한 점이 있어서 질문 드립니다.',
  //   date: '2024-03-28'
  // },
  // {
  //   postNo: 34,
  //   category: '홍보',
  //   title: '최신 제품 소식!',
  //   writer: '이영희',
  //   view: 120,
  //   content: '우리 회사의 최신 제품 소식을 전해드립니다.',
  //   date: '2024-03-27'
  // },
  // {
  //   postNo: 33,
  //   category: '후기',
  //   title: '영화 후기',
  //   writer: '박민수',
  //   view: 90,
  //   content: '오늘 본 영화의 감상평을 공유합니다.',
  //   date: '2024-03-26'
  // },
  // {
  //   postNo: 32,
  //   category: '자유',
  //   title: '하고 싶은 말씀',
  //   writer: '김영희',
  //   view: 110,
  //   content: '자유롭게 하고 싶은 말씀을 적어주세요.',
  //   date: '2024-03-25'
  // },
  // {
  //   postNo: 31,
  //   category: '질문·고민',
  //   title: '도와주세요!',
  //   writer: '홍길동',
  //   view: 70,
  //   content: '어떤 문제로 고민 중입니다. 도와주세요!',
  //   date: '2024-03-24'
  // },
  // {
  //   postNo: 30,
  //   category: '홍보',
  //   title: '새로운 이벤트 안내',
  //   writer: '김지수',
  //   view: 85,
  //   content: '우리 회사의 새로운 이벤트를 안내합니다.',
  //   date: '2024-03-23'
  // },
  // {
  //   postNo: 29,
  //   category: '후기',
  //   title: '음식점 후기',
  //   writer: '이성민',
  //   view: 95,
  //   content: '오늘 다녀온 음식점의 후기를 공유합니다.',
  //   date: '2024-03-22'
  // },
  // {
  //   postNo: 28,
  //   category: '자유',
  //   title: '즐거운 주말',
  //   writer: '박지현',
  //   view: 105,
  //   content: '모두 즐거운 주말 보내세요!',
  //   date: '2024-03-21'
  // },
  // {
  //   postNo: 27,
  //   category: '질문·고민',
  //   title: '도서 추천 받아요',
  //   writer: '김민수',
  //   view: 75,
  //   content: '요즘 읽을만한 책 추천 부탁드려요.',
  //   date: '2024-03-20'
  // },
  // {
  //   postNo: 26,
  //   category: '홍보',
  //   title: '최신 소식 공유',
  //   writer: '이지연',
  //   view: 115,
  //   content: '우리 회사의 최신 소식을 공유합니다.',
  //   date: '2024-03-19'
  // },
  // {
  //   postNo: 25,
  //   category: '후기',
  //   title: '여행 후기',
  //   writer: '박민지',
  //   view: 85,
  //   content: '최근 다녀온 여행의 후기를 공유합니다.',
  //   date: '2024-03-18'
  // },
  // {
  //   postNo: 24,
  //   category: '자유',
  //   title: '오늘의 한 줄',
  //   writer: '이승준',
  //   view: 95,
  //   content: '오늘의 한 줄을 남겨주세요.',
  //   date: '2024-03-17'
  // },
  // {
  //   postNo: 23,
  //   category: '질문·고민',
  //   title: '고민 상담 받습니다.',
  //   writer: '김민지',
  //   view: 80,
  //   content: '고민 상담을 받아보고 싶습니다.',
  //   date: '2024-03-16'
  // },
  // {
  //   postNo: 22,
  //   category: '홍보',
  //   title: '신상품 출시 소식',
  //   writer: '박정우',
  //   view: 100,
  //   content: '새로운 제품 출시 소식을 알려드립니다.',
  //   date: '2024-03-15'
  // },
  // {
  //   postNo: 21,
  //   category: '후기',
  //   title: '음악 감상 후기',
  //   writer: '김은지',
  //   view: 90,
  //   content: '최근 들은 음악의 감상 후기를 나눕니다.',
  //   date: '2024-03-14'
  // },
  // {
  //   postNo: 20,
  //   category: '자유',
  //   title: '오늘의 일상 이야기',
  //   writer: '사용자1',
  //   view: 103,
  //   content: '오늘은 날씨가 좋아서 산책을 하고 왔어요. 여러분은 어떤 하루를 보내셨나요?',
  //   date: '2024/03/29'
  // },
  // {
  //   postNo: 19,
  //   category: '질문·고민',
  //   title: '공부하는 팁 공유해주세요!',
  //   writer: '스터디맨',
  //   view: 78,
  //   content: '공부할 때 효율적인 방법이 있을까요? 함께 공유해봐요.',
  //   date: '2024/03/28'
  // },
  // {
  //   postNo: 18,
  //   category: '홍보',
  //   title: '새로운 카페 오픈 안내',
  //   writer: '카페마스터',
  //   view: 205,
  //   content: '저희 카페가 오픈했습니다! 맛있는 음료와 함께 편안한 시간 보내실 수 있어요.',
  //   date: '2024/03/27'
  // },
  // {
  //   postNo: 17,
  //   category: '후기',
  //   title: '최근에 본 영화 후기',
  //   writer: '영화광',
  //   view: 152,
  //   content: '최근에 본 영화 중에서 추천하고 싶은 작품이 있나요? 함께 후기를 나눠봐요.',
  //   date: '2024/03/26'
  // },
  // {
  //   postNo: 16,
  //   category: '자유',
  //   title: '주말 계획은 어떠세요?',
  //   writer: '주말놀이',
  //   view: 89,
  //   content: '주말에는 무엇을 하실 예정인가요? 함께 계획을 공유해보세요.',
  //   date: '2024/03/25'
  // },
  // {
  //   postNo: 15,
  //   category: '질문·고민',
  //   title: '취미 생활 추천해주세요',
  //   writer: '취미러',
  //   view: 121,
  //   content: '요즘 취미생활을 시작하려고 하는데 추천해주실만한 취미가 있을까요?',
  //   date: '2024/03/24'
  // },
  // {
  //   postNo: 14,
  //   category: '홍보',
  //   title: '이달의 할인 이벤트 안내',
  //   writer: '쇼핑맨',
  //   view: 198,
  //   content: '이번 달에는 특별한 할인 이벤트가 진행됩니다! 놓치지 마세요.',
  //   date: '2024/03/23'
  // },
  // {
  //   postNo: 13,
  //   category: '후기',
  //   title: '최근에 갔던 여행 후기',
  //   writer: '여행러',
  //   view: 174,
  //   content: '최근에 다녀온 여행지에서의 소중한 경험을 공유해보아요.',
  //   date: '2024/03/22'
  // },
  // {
  //   postNo: 12,
  //   category: '자유',
  //   title: '오늘의 일기',
  //   writer: '일기쓰는 사람',
  //   view: 105,
  //   content: '오늘은 하루종일 집에서 쉬었어요. 편안한 하루였습니다.',
  //   date: '2024/03/21'
  // },
  // {
  //   postNo: 11,
  //   category: '질문·고민',
  //   title: '스트레스 해소 방법 공유해주세요',
  //   writer: '스트레스피리트',
  //   view: 144,
  //   content: '요즘 스트레스가 많아서 힘들어요. 스트레스 해소 방법을 알려주세요.',
  //   date: '2024/03/20'
  // },
  // {
  //   postNo: 10,
  //   category: '홍보',
  //   title: '새로운 책 출간 소식',
  //   writer: '책추천러',
  //   view: 202,
  //   content: '새로운 책이 출간되었습니다! 독서를 즐기시는 분들에게 추천드립니다.',
  //   date: '2024/03/19'
  // },
  // {
  //   postNo: 9,
  //   category: '후기',
  //   title: '새로운 레스토랑 방문 후기',
  //   writer: '맛있는음식',
  //   view: 183,
  //   content: '요즘 유명한 레스토랑을 다녀왔어요. 맛있는 음식과 분위기를 공유했어요.',
  //   date: '2024/03/18'
  // },
  // {
  //   postNo: 8,
  //   category: '자유',
  //   title: '좋아하는 음악 추천해주세요',
  //   writer: '음악감상가',
  //   view: 97,
  //   content: '최근에 듣고 있는 음악 중에 좋아하는 곡이 있나요? 추천해주세요.',
  //   date: '2024/03/17'
  // },
  // {
  //   postNo: 7,
  //   category: '질문·고민',
  //   title: '취업 준비 팁 공유해주세요',
  //   writer: '취업러',
  //   view: 131,
  //   content: '취업을 준비하고 있는데 팁을 공유해주실 수 있나요?',
  //   date: '2024/03/16'
  // },
  // {
  //   postNo: 6,
  //   category: '홍보',
  //   title: '취미 클래스 개설 안내',
  //   writer: '클래스맨',
  //   view: 176,
  //   content: '다양한 취미 클래스를 개설하였습니다! 취미생활을 시작해보세요.',
  //   date: '2024/03/15'
  // },
  // {
  //   postNo: 5,
  //   category: '후기',
  //   title: '최근에 본 공연 후기',
  //   writer: '공연감상가',
  //   view: 209,
  //   content: '최근에 본 공연에서의 감동적인 순간을 공유합니다.',
  //   date: '2024/03/14'
  // },
  // {
  //   postNo: 4,
  //   category: '자유',
  //   title: '오늘의 일기',
  //   writer: '일기쓰는 사람',
  //   view: 105,
  //   content: '오늘은 하루종일 집에서 쉬었어요. 편안한 하루였습니다.',
  //   date: '2024/03/13'
  // },
  // {
  //   postNo: 3,
  //   category: '질문·고민',
  //   title: '스트레스 해소 방법 공유해주세요',
  //   writer: '스트레스피리트',
  //   view: 144,
  //   content: '요즘 스트레스가 많아서 힘들어요. 스트레스 해소 방법을 알려주세요.',
  //   date: '2024/03/12'
  // },
  // {
  //   postNo: 2,
  //   category: '홍보',
  //   title: '새로운 책 출간 소식',
  //   writer: '책추천러',
  //   view: 202,
  //   content: '새로운 책이 출간되었습니다! 독서를 즐기시는 분들에게 추천드립니다.',
  //   date: '2024/03/11'
  // },
  // {
  //   postNo: 1,
  //   category: '후기',
  //   title: '새로운 레스토랑 방문 후기',
  //   writer: '맛있는음식',
  //   view: 183,
  //   content: '요즘 유명한 레스토랑을 다녀왔어요. 맛있는 음식과 분위기를 공유했어요.',
  //   date: '2024/03/10'
  // },
];


export default mockData;