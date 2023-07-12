import React, {useState} from 'react';
import {Image, View, Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const HandelPickImage = () => {
  const [image, setImage] = useState(null);

  const handleImagePicked = response => {
    if (response.didCancel) {
      // The user canceled the image picker.
    } else if (response.error) {
      // There was an error picking the image.
    } else {
      // The user picked an image.
      setImage(response.assets[0].uri);
    }
  };

  return (
    <View>
      <Image
        source={{uri: image}}
        resizeMode="contain"
        width={200}
        height={200}
      />
      <Button
        title="Pick Image"
        onPress={() =>
          launchImageLibrary(
            {
              mediaType: 'photo',
              quality: 0.8,
              allowsEditing: true,
              allowsMultipleSelection: false,
            },
            handleImagePicked,
          )
        }
      />
    </View>
  );
};

export default HandelPickImage;
