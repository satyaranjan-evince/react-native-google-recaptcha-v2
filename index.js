import React, { Component } from 'react';
import {
    View, StyleSheet, Dimensions, Text
} from 'react-native';
import Modal from 'react-native-modal';
import GoogleReCaptcha from './GoogleReCaptcha';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

class ConfirmGoogleCaptcha extends Component {
    state = {
        show: false
    }
    show = () => {
        this.setState({ show: true });
    }
    hide = () => {
        this.setState({ show: false });
    }
    render() {
        let { show } = this.state;
        let { siteKey, baseUrl, languageCode, onMessage, cancelButtonText } = this.props;
        return (
            <Modal
                useNativeDriver
                hideModalContentWhileAnimating
                deviceHeight={height}
                deviceWidth={width}
                style={styles.modal}
                animationIn="fadeIn"
                animationOut='fadeOut'
                isVisible={show}>
                <SafeAreaView style={styles.wrapper}>
                    <GoogleReCaptcha
                        url={baseUrl}
                        siteKey={siteKey}
                        onMessage={onMessage}
                        languageCode={languageCode}
                        cancelButtonText={cancelButtonText}
                    />
                    <TouchableOpacity onPress={this.hide} style={[styles.closeButton, this.props.closeButtonStyle]}>
                        <Text style={[styles.closeText, this.props.closeTextStyle]}>{cancelButtonText}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 10 },
    modal: { margin: 0 },
    wrapper: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', overflow: 'hidden' , paddingTop: 20},
    closeText: { color: "white" },
    closeButton: { paddingVertical: 10, paddingHorizontal: 20, alignSelf: 'center', marginBottom: 10, backgroundColor: "red", borderRadius: 16 }
});
ConfirmGoogleCaptcha.propTypes = {
    siteKey: PropTypes.string.isRequired,
    baseUrl: PropTypes.string,
    onMessage: PropTypes.func,
    languageCode: PropTypes.string,
    cancelButtonText: PropTypes.string
}
export default ConfirmGoogleCaptcha;
