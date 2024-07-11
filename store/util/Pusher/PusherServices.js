import {userAppData} from '../../UserDataSlice';
import {Pusher} from '@pusher/pusher-websocket-react-native';
const pusher = Pusher.getInstance();
const PusherInitialization = async (dispatch, data) => {
  try {
    await pusher.init({
      apiKey: 'c859f87174ab06a86d70',
      cluster: 'ap3',
    });
    const connection = await pusher.connect();
    await pusher.subscribe({
      channelName: 'subscription-channel',
      onEvent: event => {
        console.warn('Event triggred successfully');
        const userId = JSON.parse(event?.data)?.user?.id;
        if (userId === data?.user?.id) {
          const headers = {
            Authorization: `Bearer ${data.token}`,
          };

          dispatch(
            userAppData({
              endPoint: '/user',
              method: 'post',
              data: null,
              headers: headers,
            }),
          );
        }
      },
    });
  } catch (error) {
    console.warn('error', error);
  }
};

export default PusherInitialization;
