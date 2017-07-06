/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';

export default class learnmap extends Component {
  constructor(props){
    super(props);
    this.watchId = null;
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0932,
        longitudeDelta: 0.0431,
      },
      latlng: {
        latitude: 37.78825,
        longitude: -122.4324
      }
    }
  }

  componentDidMount(){
    //this.getCurrentLocation();
    this.watchId = navigator.geolocation.watchPosition(
      (location) => {
        console.log('location changed');
        let coords = {latitude: location.coords.latitude, longitude: location.coords.longitude};

        this.setState({
          latlng: {latitude: location.coords.latitude, longitude: location.coords.longitude}
        });
        this._map.animateToCoordinate(coords, 1000);
      },
      (error) => alert(JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  componentWillUnMount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>
      {
        console.log('current position: ', position);
        var initialPosition = JSON.stringify(position);
        let initialLatLng = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({latlng: initialLatLng});
      }
      ,(error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  onRegionChange = (region) => {
    console.log('region changed!');
    //console.log(region.latitude);
    // this.getCurrentLocation();
    // this.setState({
    //   region: region,
    //   latlng: {
    //     latitude: region.latitude,
    //     longitude: region.longitude
    //   }
    // });
  }

  onLocationPress = (e) => {
    console.log(e);
    navigator.geolocation.getCurrentPosition( (position) =>
      {
        console.log('position: ', position);
        var initialPosition = JSON.stringify(position);
        let initialLatLng = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({latlng: initialLatLng});
      }
      ,(error) => alert(JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}}
          mapType="standard"
          ref={component => this._map = component}

          zoomEnabled={true}
          showsCompass={true}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}>
          <MapView.Marker coordinate={this.state.latlng} title='Vijayakumar' description='N' />
        </MapView>

        {/* <TouchableHighlight
          style={{flex: 1,
          position: 'absolute', backgroundColor: 'blue',
          height: 50, width: 50, top: 50, opacity: 0.5}}
          onPress={this.onLocationPress}>
          <Text>Press</Text>
        </TouchableHighlight> */}

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('learnmap', () => learnmap);
