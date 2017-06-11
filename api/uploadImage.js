import secrets from '../secrets';
import moment from 'moment';

export default async function uploadImageAsync(uri) {
  let formData = new FormData();
  formData.append("query", `
    mutation CreateFile($input: CreateFileInput!) {
      createFile(input: $input) {
        changedFile {
          id
          name
          blobMimeType
          blobUrl
          user {
            id
          }
        }
      }
    }
  `)
  formData.append("variables", JSON.stringify({
    "input": {
      "name": `${moment().format('YYYYMMDD')}.png`,
      "recordId": `${this.props.data.viewer.user.records.edges[0].node.id}`,
      "userId": `${this.props.data.viewer.user.id}`,
      "blobFieldName": "photo"
    }
  }))
  formData.append('photo', {
    uri,
    name: `photo.jpg`,
    type: `image/jpg`
  })

  let options = {
    method: 'POST',
    headers: {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  }

  const imgRef = firebaseApp.storage().ref('images');
  imgRef.put(formData).then(snapshot => {
    debugger
  });

  // return fetch(`https://${config.uploadUrl}`, options)
}

// resizeImageAsync(result) {
//   let cropData = {
//     offset: {
//       x: 0,
//       y: 0
//     },
//     size: {
//       width: result.width,
//       height: result.height
//     },
//     displaySize: {
//       width: 800,
//       height: 1200
//     },
//     resizeMode: 'cover'
//   }
//   ImageEditor.cropImage(result.uri, cropData,
//     (success) => {
//       console.log('edited uri?: ', success)
//       this.setState({ tempPhoto: success })
//       this.uploadImageAsync(success)
//       .then(response => {
//         console.log('response from uploadImageAsync: ', response)
//         this.props.data.refetch({
//           args: {
//             id: {
//               eq: this.props.navigation.state.params.record.id
//             }
//           }
//         })
//       })
//       .catch(error => console.log(error.message))
//     },
//     (err) => {console.log('edited err: ', err)}
//   )
// }
//
// getImage = async() => {
//   try {
//     this.setState({ isLoading: true })
//     let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: false })
//     console.log('result of ImagePicker: ', result)
//     if(!result.cancelled && result.fileSize < 90000) {
//       this.setState({ tempPhoto: result.uri })
//       this.uploadImageAsync(result.uri)
//       .then(response => {
//         console.log('response from uploadImageAsync: ', response)
//         this.props.data.refetch({
//           args: {
//             id: {
//               eq: this.props.navigation.state.params.record.id
//             }
//           }
//         })
//       })
//     } else if(!result.cancelled) {
//       this.resizeImageAsync(result)
//     } else {
//       this.setState({ isLoading: false })
//     }
//   } catch (error) {
//     Alert.alert('Error saving file', error.message)
//   }
// }
