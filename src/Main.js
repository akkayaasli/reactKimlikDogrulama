import React, {Component} from 'react';
import {Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';

import Header from './ortak/Header';

import LoginForm from './LoginForm';



import Button from './ortak/ButtonDesign';

import CardSection from './ortak/CardSection';

import Spinner from './ortak/Spinner';




class Main extends Component{

    state={loggedIn:null}

    componentDidMount(){
        //uygulamamız ilk açıldığında firebase bulut servisine bağlanarak gerekli konfigürasyon işlemleri yapılıyor:

    auth().onAuthStateChanged((user)=>{
        if(user)
        {
            this.setState({loggedIn:true});//eğer kullanıcı bilgilerini doğru girdiyse, aşağıda switch case içinde belirtildiği gibi çıkış butonunu görecek.

        }

        else
        {
            this.setState({loggedIn:false});//eğer kullanıcı bilgilerini yanlış girdiyse, aşağıda switch case içinde belirtildiği gibi loginForm ekranını görecek.
        }
    });

    }



    clickLogout()
    {

        auth().signOut();

    }

    renderContent()
    {
        //switch case yapısı kullanıcaz.Çünkü üç durum var.
        switch(this.state.loggedIn)//loggedIn nin durumlarını alıyoruz.
        {
            case true:
                return(
                    <CardSection>
                        <Button onPress={this.clickLogout.bind(this)}>ÇIKIŞ</Button>
                    </CardSection>
                );
            case false:
                return(
                    <LoginForm/>
                );
                break;
            default:
                return(
                    <View>
                        <Spinner size="large"/>
                    </View>
                );
        }
    }
    //bir sorgu hazırlamalıyız. Kullanıcı daha önce giriş yaptıysa doğrudan yönlendiren aksi halde logine yönlendiren.
   
    render(){
        return(
            <View>
                <Header headerText="Kimlik Doğrulama Sistemi"/>

                {this.renderContent()}


            </View>
        );
    }
}
export default Main;
