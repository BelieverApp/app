import React from 'react'
import {
  View, StyleSheet, ScrollView,
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import BelieverRequestController from "../controllers/BelieverRequestController";
import Client from "./Client";
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";

export default class Explore extends React.Component {
  // static propTypes = {
  //   componentId: PropTypes.string.isRequired,
  // };
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Explore Brands'
        },
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    this.onClientClick = this.onClientClick.bind(this);
    Navigation.events().bindComponent(this);
    this.state = {
      clients : []
    }
  }

  async componentDidMount() {
    try {
      let clients = await this.believerRequestController.getClientsNearUser();
      this.setState({clients: clients});
    }
    catch(e) {
      throw e;
    }

  }

  async onClientClick(item) {


    let currentActiveTab = await CommonUtils.getCurrentActiveTab();
    console.log(currentActiveTab)
    Navigation.push(currentActiveTab, {
      component: {
        name: 'ClientDetail',
        passProps: {
          clientId: item.id,
          clientName: item.name,
          clientDescription: item.description,
          clientImage: 'https://picsum.photos/g/640/480/?random',
          clientLogo: 'https://picsum.photos/75/75/?random',
        },
        options: {
          topBar: {
            visible: true,
            title: {
              text: item.name
            }
          }
        }

      }
    });
  }


  renderClient(item) {

    return <Client
      id={item.id}
      key={item.id}
      clientId={item.id}
      clientName={item.name}
      clientDescription={item.content}
      clientImage={'https://picsum.photos/g/640/480/?random'}
      clientLogo={'https://picsum.photos/75/75/?random'}
      onClientClick={() => this.onClientClick(item)}
    />
  }

  renderClientList() {
    let clientList = [];
    this.state.clients.forEach((item) => {
      clientList.push(this.renderClient(item));
    });
    return clientList;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        { this.renderClientList() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})