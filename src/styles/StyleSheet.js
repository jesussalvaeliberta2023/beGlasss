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
    marginRight: 65,
  },
  
  perfButton:{
    width: '10%',
    height: '14%',
  },

  configPerfButton:{
    width: '10%',
    height: '14%',
  },
  literlyButton:{
    width: 24, 
    height: 24,
    marginTop: -8,
  },

  hexagon:{
    width: '50%',
    height: 173,
    marginBottom: -35, 
  },

  drinkSelection:{
    width: '30%',
    height: '94%',
    position: 'absolute',
    justifyContent: 'center',
  },

  choose: {
    color:'white',
    width: '50%',
    fontSize: 48,
    position: 'absolute',
    marginTop: '19%',
    marginLeft: '4%',
  },

  header: {
    width: '100%',
    height: '5%',
    marginLeft: '3%',
    marginTop: '8%',
    flexDirection: 'row', 
  },

  headerOp: {
    width: 40,
    height: 20,
    marginTop: '10%',
  },
 
  headerPe: {
    width: 60, 
    height: 60, 
    marginLeft: '78%'
  },


  // Aqui começa o Design da tela de Favoritos

  containerII: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  posterImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
    },




  // Aqui começa o Design da tela de Perfil

  containerIII: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191266',
  },

  button: {
    backgroundColor: '#6258e8',
    padding: 10,
    borderRadius: 3,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  text: {
    marginBottom: 100,
    fontSize: 18,
    color: 'white',
  },

  languagesList: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#6258e8',
  },

  languageButton: {
    padding: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },

  lngName: {
    fontSize: 16,
    color: 'white',
  },
});

export default Styles;
