import {Dimensions} from 'react-native';

const dataLimit = 1000;

export const dataFn = () => {
  return [
    {
      id: 1,
      value: Math.random() * dataLimit,
      color: 'red',
      company: 'HP',
      url: 'https://brandcentral.hp.com/us/en/_jcr_content/root/container/c05_carousel_copy/item_1605621614615.coreimg.jpeg/1624654633670/elements-logo.jpeg',
    },
    {
      id: 2,
      value: Math.random() * dataLimit,
      color: 'yellow',
      company: 'Amazon',
      url: 'https://www.seekpng.com/png/detail/260-2605421_button-amazon-available-at-amazon-logo.png',
    },
    {
      id: 3,
      value: Math.random() * dataLimit,
      color: 'blue',
      company: 'Apple',
      url: 'https://e7.pngegg.com/pngimages/779/788/png-clipart-apple-logo-%E4%BF%83%E9%94%80-heart-logo.png',
    },
    {
      id: 4,
      value: Math.random() * dataLimit,
      color: 'orange',
      company: 'Dell',
      url: 'https://www.freeiconspng.com/thumbs/dell-logo-icon-png/dell-icon-11.jpg',
    },
    {
      id: 5,
      value: Math.random() * dataLimit,
      color: 'teal',
      company: 'Samsung',
      url: 'https://png.pngitem.com/pimgs/s/2-24666_samsung-logo-png-free-download-samsung-logo-png.png',
    },
  ];
};

export const _WIDTH = Dimensions.get('window').width;

export const getPositions = state => {
  'worklet';

  let sortedItem = state;

  sortedItem.sort((a, b) =>
    a.value === b.value ? 0 : a.value > b.value ? -1 : 1,
  );

  let reduceObj = sortedItem.reduce((prev, cur, index) => {
    let newObj = Object.assign({}, prev);

    newObj[cur.id] = index;

    return newObj;
  }, {});

  return reduceObj;
};

export const getNormalizeVal = arr => {
  let mapArr = arr.map(item => item.value);

  return (_WIDTH - 120) / Math.max(...mapArr);
};

export const gap = 60;
export const animationTiming = 2000;
