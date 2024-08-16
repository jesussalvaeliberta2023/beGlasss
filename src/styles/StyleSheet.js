import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20202C',
  },

  test: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  
  tabs: {
    backgroundColor: '#00000090',
    width: '60%',
    height: 70,
    position: 'absolute',
    bottom: '4%',
    left: '20%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
  },

  homeButton: {
    width: '10%',
    height: '14%',
    marginRight: 65,
  },

  favsButton: {
    width: '10%',
    height: '14%',
  },

  literlyButton:{
    width: 24, 
    height: 24,
    marginTop: -8,
  }
});

export default Styles;
