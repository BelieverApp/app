import React from 'react'
import {
  View,
  Text,
  StyleSheet, Image, ScrollView, TouchableHighlight, ImageBackground,
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import BelieverRequestController from "../controllers/BelieverRequestController";
import {Button} from "react-native-elements";

export default class Status extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Status'
        },
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    this.onRedeemPointsClick = this.onRedeemPointsClick.bind(this);
    this.onSendReferralClick = this.onSendReferralClick.bind(this);
    this.state = {
      user : null
    }
  }

  onRedeemPointsClick() {
    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: 1,
      }
    });
  }

  onSendReferralClick() {
    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: 3,
      }
    });
  }

  async componentDidMount() {
    try {
      let user = await this.believerRequestController.getUserProfile();
      this.setState({user: user});
    }
    catch(e) {
      throw e;
    }
  }

   renderImage() {
    return <ImageBackground
      source={{uri: 'https://picsum.photos/g/640/480/?random'}}
      style={{ flex:2.5, height:'100%', width:'100%',}}>
      <View style={{flex:1, flexDirection:'column', alignItems:'center', }}>
        <View style={{flex:3, width:'100%', alignItems: 'center', paddingTop:20}}>
          <Text style={{color:'#fff', fontSize: 20, fontWeight:'bold'}}>
            {this.state.user? this.state.user.name: null}
          </Text>
          <Text style={{color:'#fff',}}>
            {this.state.user? this.state.user.level_name: null}
          </Text>
        </View>
        <View style={{flex: 1, width:'100%', alignItems: 'center'}}>
          <Button
            backgroundColor={'#35AFC8'}
            title={'Redeem Points'}
            onPress={this.onRedeemPointsClick}
            textStyle={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily:'Helvetica',
              paddingHorizontal: 30
            }}
          />
        </View>
      </View>

    </ImageBackground>
  }

  renderAnalytics() {
    return <View style={{flex:2, backgroundColor: '#E6E7E8', margin:10}}>
      <View style={{flex:1, flexDirection: 'row', justifyContent:'center'}}>
        <View style={{ flex:1, borderBottomWidth:1, borderRightWidth:1, borderColor:'#fff', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.analyticsNumber}>
            {this.state.user? this.state.user.missions_completed_count : null}
          </Text>
          <Text style={styles.analyticsName}>
            Missions Completed
          </Text>
        </View>
        <View style={{ flex:1, borderBottomWidth:1, borderRightWidth:1, borderColor:'#fff', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.analyticsNumber}>
            {this.state.user? this.state.user.point_balance : null}
          </Text>
          <Text style={styles.analyticsName}>
            Unredeemed Points
          </Text>
        </View>
        <View style={{ flex:1, borderBottomWidth:1, borderBottomColor:'#fff', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.analyticsNumber}>
            {this.state.user? this.state.user.historic_total_points : null}
          </Text>
          <Text style={styles.analyticsName}>
            Total Points Earned
          </Text>
        </View>
      </View>
      <View style={{flex:1, flexDirection: 'row', justifyContent:'center'}}>
        <View style={{ flex:1, borderRightWidth:1, borderColor:'#fff', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.analyticsNumber}>
            {this.state.user? this.state.user.brands_following_count : null}
          </Text>
          <Text style={styles.analyticsName}>
            Following
          </Text>
        </View>
        <View style={{ flex:1, borderRightWidth:1, borderColor:'#fff', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.analyticsNumber}>
            {this.state.user? this.state.user.rewards_redeemed_count : null}
          </Text>
          <Text style={styles.analyticsName}>
            Unlocked Rewards
          </Text>
        </View>
        <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.analyticsNumber}>
            {this.state.user? this.state.user.referrals_sent_count : null}
          </Text>
          <Text style={styles.analyticsName}>
            Referrals Sent
          </Text>
        </View>
      </View>

    </View>
  }

  renderReferralButton() {
    return <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}>
      <View  >
        <Text style={{fontSize:16, fontWeight: 'bold', color:'#A4A4A4', marginVertical:15}}>
          Instantly Unlock Huge Rewards
        </Text>
      </View>
      <View>
        <Button
          backgroundColor={'#35AFC8'}
          title={'Send a Referral'}
          onPress={this.onSendReferralClick}
          textStyle={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily:'Helvetica',
            paddingHorizontal: 30
          }}
        />
      </View>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        {this.renderAnalytics()}
        {this.renderReferralButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E7E8',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  analyticsNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: '#35AFC8'
  },
  analyticsName: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#A4A4A4',
    marginTop: 20
  }
})