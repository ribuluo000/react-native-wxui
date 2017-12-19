'use strict';
import React, { Component, } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TextInput
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import * as Animatable from 'react-native-animatable';
import * as Util from '../Util';
import PropTypes from 'prop-types';


export function showDialog(options, onConfirm, onCancel) {
    Dialog.showDialog(options, onConfirm, onCancel);
}
const styles = StyleSheet.create({
    maskView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center'
    },
    container: {
        width: Util.WIDTH * 2 / 3,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 6,
        top: (Util.HEIGHT - 200) / 2 - 100
    },
    messageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        marginTop: 10,
        height: Util.ONE_PIXEL,
        width: Util.WIDTH * 2 / 3,
        backgroundColor: 'rgb(224,224,224)',
    },
    controlView: {
        height: 40,
        width: Util.WIDTH * 2 / 3,
        borderTopWidth: Util.ONE_PIXEL,
        borderTopColor: 'rgb(224,224,224)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginTop: 15,
        color: 'black',
        fontSize: 16,
        width: Util.WIDTH * 2 / 3 - 80,
        borderBottomWidth: Util.ONE_PIXEL,
        borderBottomColor: 'rgb(224,224,224)',
        textAlign: 'center'
    },
    message: {
        height: 30,
        marginTop: 15,
        fontSize: 14,
        color: 'rgb(70,70,70)',
        width: Util.WIDTH * 2 / 3 - 60,
        textAlign: 'center'
    },
    textInput: {
        height: 40,
        color: 'gray',
        width: Util.WIDTH * 2 / 3 - 60,
        fontSize: 13,
        alignSelf: 'center'
    },
    cancel: {
        color: 'rgb(35,151,246)',
        textAlign: 'center',
    },
    cancelTouchable: {
        width: Util.WIDTH / 3,
        height: 40,
        borderRightWidth: Util.ONE_PIXEL,
        borderRightColor: 'rgb(224,224,224)',
        justifyContent: 'center'
    },
    confirm: {
        textAlign: 'center',
        color: 'rgb(35,151,246)',
    },
    confirmTouchable: {
        width: Util.WIDTH / 3,
        height: 40,
        justifyContent: 'center'
    }
})
class Dialog extends Component {

    static componentView = null;
    static instance = null;
    static showDialog = (options, onConfirm, onCancel) => {
        let hud = (
            <Dialog options={options} onConfirm={onConfirm} onCancel={onCancel} getInstance={(i) => {
                Dialog.instance = i;
            }} />
        )
        if (Dialog.componentView) {
            Dialog.componentView.update(hud)
        } else {
            Dialog.componentView = new RootSiblings(hud);
        }
    }

    static hideDialog = () => {
        if (!Dialog.instance) return;
        return new Promise((resolve, reject) => {
            Dialog.instance._hide().then(() => {
                if (Dialog.componentView) {
                    Dialog.componentView.destroy();
                    Dialog.componentView = null;
                    Dialog.instance = null;
                }
                resolve();
            })
        })
    }



    static propTypes = {
        options: PropTypes.object,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func
    }

    state = {
        maskAnimationType: 'fadeIn',
        maskAnimationDuration: 200,
        componentAnimationType: 'bounceIn',
        componentAnimationDuration: 500,
        text: ''
    }
    _onTextChange = (text) => {
        this.setState({ text });
    }
    _onCancel = () => {
        Dialog.hideDialog().then(() => {
            this.props.onCancel && this.props.onCancel();
        })
    }

    _onConfirm = () => {
        Dialog.hideDialog().then(() => {
            this.props.onConfirm && this.props.onConfirm(this.state.text);
        })
    }
    _hide = () => new Promise((resolve, reject) => {
        this.setState({
            maskAnimationType: 'fadeOut',
            maskAnimationDuration: 200,
            componentAnimationType: 'bounceOut'
        });
        this.resolve = resolve;
    })

    componentDidMount() {
        this.props.getInstance && this.props.getInstance(this);
    }

    render() {
        let { options } = this.props;
        let { maskAnimationType, maskAnimationDuration, componentAnimationType, componentAnimationDuration } = this.state;
        return (
            <Animatable.View style={styles.maskView} animation={maskAnimationType} easing="linear" duration={maskAnimationDuration}>
                <Animatable.View style={styles.container} animation={componentAnimationType} easing="linear" duration={componentAnimationDuration} onAnimationEnd={() => {
                    if (maskAnimationType === 'fadeOut') this.resolve();
                }}>
                        <View style={styles.messageView}>
                            <Text style={styles.title}>{options.title}</Text>
                            <View style={styles.border} />
                            <Text style={styles.message}>{options.message}</Text>
                            <TextInput style={styles.textInput}
                                placeholder={options.placeholder}
                                placeholderTextColor="gray"
                                value={this.state.text}
                                onChangeText={this._onTextChange}
                                underlineColorAndroid="transparent"
                                selectionColor="rgb(35,151,246)"
                                returnKeyType="done" />
                            <View style={[styles.border, { marginTop: 0, width: Util.WIDTH * 2 / 3 - 80, marginBottom: 15 }]} />
                        </View>
                        <View style={styles.controlView}>
                            <TouchableHighlight style={styles.cancelTouchable} underlayColor="rgb(228,228,228)" onPress={this._onCancel}>
                                <Text style={styles.cancel}>{options.cancelTitle || 'cancel'}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.confirmTouchable} underlayColor="rgb(228,228,228)" onPress={this._onConfirm}>
                                <Text style={styles.confirm}>{options.confirmTitle || 'confirm'}</Text>
                            </TouchableHighlight>
                        </View>
                </Animatable.View>
            </Animatable.View>
        )
    }
}
