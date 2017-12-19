'use strict';
import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import isEqual from 'lodash/isEqual';

export default class Button extends Component {

    constructor(props) {
        super(props);
        this._renderChildren = this._renderChildren.bind(this);
        this._renderInnerText = this._renderInnerText.bind(this);
    }

    _renderChildren() {
        let childElements = [];
        React.Children.forEach(this.props.children, (item) => {
            if (typeof item === 'string' || typeof item === 'number') {
                const element = (
                    <Text
                        style={[styles.textButton, this.props.textStyle]}
                        allowFontScaling={this.props.allowFontScaling}
                        key={item}>
                        {item}
                    </Text>
                );
                childElements.push(element);
            } else if (React.isValidElement(item)) {
                childElements.push(item);
            }
        });
        return (childElements);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isEqual(nextProps, this.props)) {
            return true;
        }
        return false;
    }

    _renderInnerText() {
        if (this.props.isLoading) {
            return (
                <ActivityIndicator
                    animating={true}
                    size='small'
                    style={styles.spinner}
                    color={this.props.activityIndicatorColor || 'black'}
                    />
            );
        }
        return this._renderChildren();
    }

    render() {
        if (this.props.isDisabled === true || this.props.isLoading === true) {
            return (
                <View style={[styles.button, this.props.style, (this.props.disabledStyle || styles.opacity)]}>
                    {this._renderInnerText() }
                </View>
            );
        } else {
            // Extract Touchable props
            let touchableProps = {
                onPress: this.props.onPress,
                onPressIn: this.props.onPressIn,
                onPressOut: this.props.onPressOut,
                onLongPress: this.props.onLongPress,
                activeOpacity: this.props.activeOpacity,
                delayLongPress: this.props.delayLongPress,
                delayPressIn: this.props.delayPressIn,
                delayPressOut: this.props.delayPressOut,
            };
            if (Button.isAndroid) {
                touchableProps = Object.assign(touchableProps, {
                    background: this.props.background || TouchableNativeFeedback.SelectableBackground()
                });
                return (
                    <TouchableNativeFeedback {...touchableProps}>
                        <Text style={[styles.button, this.props.style]}>
                            {this._renderInnerText() }
                        </Text>
                    </TouchableNativeFeedback>
                )
            } else {
                return (
                    <TouchableOpacity {...touchableProps}
                        style={[styles.button, this.props.style]}>
                        {this._renderInnerText() }
                    </TouchableOpacity>
                );
            }
        }
    }
}

Button.prototypes = {
    textStyle: Text.propTypes.style,
    disabledStyle: Text.propTypes.style,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.element
    ]),
    activeOpacity: PropTypes.number,
    allowFontScaling: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    activityIndicatorColor: PropTypes.string,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : PropTypes.any
}

Button.statics = {
    isAndroid: (Platform.OS === 'android')
}

const styles = StyleSheet.create({
    button: {
        height: 44,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 18,
        alignSelf: 'center',
    },
    spinner: {
        alignSelf: 'center',
    },
    opacity: {
        opacity: 0.5,
    },
});
