import React from 'react'
import Header from '../components/Header'
import { GuardSpinner } from 'react-spinners-kit'
import { View, StyleSheet } from 'react-native-web'
import { connect } from 'react-redux'
import { Dimensions } from 'react-native-web'
import { withStyles } from '@material-ui/core/styles'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from '../components/Dashboard'

const width = Dimensions.get('window').width
const vh = width > 520 ? 100 : 85

const muiStyles = theme => ({
    routerRoot: {
        minHeight: `${vh}vh`,
    }
})


const AuthenticatedRoutes = ({ classes, user }) => {
    if (!user) {
        return (
            <View style={styles.loading}>
                <GuardSpinner />
            </View>
        )
    }
    return (
        <div>
            <Header />
            <div className={classes.routerRoot}>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { user: state.auth.user }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        marginTop: "20%",
        alignItems: 'center'
    }
})

export default connect(mapStateToProps)(withStyles(muiStyles)(AuthenticatedRoutes))