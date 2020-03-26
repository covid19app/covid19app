// TODO: Modal does not work on web!!!

// import React, {Component} from 'react';
// import {Modal, Text, TouchableHighlight, View} from 'react-native';

// import QRCode from 'react-native-qrcode-svg';

// interface ModalQrCodeProps {
//   url: string
// }

// export default function ModalQrCode(props: ModalQrCodeProps) {
//   const [isVisible, setIsVisible] = React.useState(false)

//   return (
//     <View>
//       <Modal animationType='none' transparent={false} visible={isVisible}>
//         <TouchableHighlight onPress={() => setIsVisible(!isVisible)}>
//           <View>
//             <QRCode value={props.url} size={128} />
//           </View>
//          </TouchableHighlight>
//       </Modal>
//       <TouchableHighlight onPress={() => setIsVisible(!isVisible)}>
//         <Text>QR</Text>
//       </TouchableHighlight>
//     </View>
//   )
// }
