import React from 'react'
import { connect } from 'react-redux'
import { Dimensions, View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native-web'

const width = Dimensions.get('window').width
const vh = width > 520 ? 100 : 85

const Dashboard = props => {
    return (
        <View style={styles.dashboardRoot}>
            <KeyboardAvoidingView style={styles.container}>
                <View>
                    <Text style={styles.text}>Hey, this is the dashboard</Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    dashboardRoot: {
        marginTop: 48,
        minHeight: `${vh}vh`,
        padding: "0.5rem",
        flex: 1,
    },
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    text: {
        color: "gainsboro",
    }
    // box: {
    //     overflowY: "overlay",
    //     minHeight: `calc(${vh}vh - ${58}px)`,
    //     maxHeight: `calc(${vh}vh - ${58}px)`,
    //     listStyleType: "none",
    //     display: 'flex',
    //     // flexDirection: "column-reverse",
    //     '&::-webkit-scrollbar': {
    //         width: '0.4em'
    //     },
    //     '&::-webkit-scrollbar-thumb': {
    //         backgroundColor: '#666',
    //         borderRadius: "5px"
    //     }
    // }
})

const mapStateToProps = state => {
    return { user: state.auth.user }
}

export default connect(mapStateToProps)(Dashboard)