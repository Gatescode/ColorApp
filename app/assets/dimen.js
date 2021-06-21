import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
export const wp = dimension => {
    return wp2dp((dimension / 414) * 100 + '%');
};
export const hp = dimension => {
    return hp2dp((dimension / 734) * 100 + '%');
};