import React from 'react';
import { Animated, Text, View } from 'react-native';

const Progress = ({step, steps, height}) => {
    const [width, setWidth] = React.useState(0);
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;
      
    React.useEffect(() =>{
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);
  
    React.useEffect(() =>{
        reactive.setValue(-width + (width*step)/steps);
    }, [step, width]);
  
    return (
        <>
            <Text style={{color:'#fff',left: '85%'}}>
                {step}/{steps}
            </Text>
            <View
                onLayout={(e) =>{
                    const newWidth = e.nativeEvent.layout.width;
  
                    setWidth(newWidth);
                }}
                style={{height, 
                backgroundColor:'rgba(156, 118, 152, 1)',
                borderRadius: height,
                overflow: "hidden",
                width: '100%',
                bottom: 0
            }}>
                <Animated.View style={{height,
                    width: '100%',
                    borderRadius: height,
                    backgroundColor: 'rgba(242, 239, 14, 1)',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: [{
                        translateX: animatedValue,
                    }]
                }}/>
            </View>
        </>
    );
  };

  export default function ProgressBar(){
      return(
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Edit to suit preference</Text>
              <Progress step={5} steps={10} height={8}/>
          </View>
      );
  }