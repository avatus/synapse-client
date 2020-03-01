import React from 'react'
import Menu from '../components/Menu'
import Header from '../components/Header'
import { GuardSpinner } from 'react-spinners-kit'
import { View, StyleSheet } from 'react-native-web'
import { connect } from 'react-redux'
import { Dimensions } from 'react-native-web'
import { withStyles } from '@material-ui/core/styles'
import { Switch, Route, Redirect } from 'react-router-dom'

import JoinRoomDialog from '../components/JoinRoomDialog'

import Dashboard from '../components/Dashboard'
import Room from '../components/Room'
import { drawerWidth } from '../config/constants'

const width = Dimensions.get('window').width
const vh = width > 520 ? 100 : 85

const muiStyles = theme => ({
    routerRoot: {
        minHeight: `${vh}vh`,
    },
    drawerOpen: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        marginLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(7) + 1,
        },
    },
})


const AuthenticatedRoutes = ({ classes, user, drawerOpen }) => {
    if (!user) {
        return (
            <View style={styles.loading}>
                <GuardSpinner />
            </View>
        )
    }
    return (
        <div 
            className={drawerOpen ? classes.drawerOpen : classes.drawerClose } 
        >
            <Menu />
            <Header />
            <div className={classes.routerRoot}>
                <Switch>
                    <Route exact path="/synapse/:id" component={Room} />
                    <Route exact path="/" component={Dashboard} />
                    <Redirect to="/" />
                </Switch>
            </div>
            <JoinRoomDialog />
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        user: state.auth.user,
        drawerOpen: state.interface.drawerOpen
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        marginTop: "20%",
        alignItems: 'center'
    }
})

export default connect(mapStateToProps)(withStyles(muiStyles)(AuthenticatedRoutes))