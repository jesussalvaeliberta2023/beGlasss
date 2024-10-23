import { Modal, Text, View, StyleSheet } from "react-native";

const ModalConfirmação = ( ) => {
    return(
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Tem certeza que deseja favoritar este produto?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Favoritar" onPress={confirmFavorite} />
            </View>
          </View>
        </View>
      </Modal>
    )
}

export default ModalConfirmação;