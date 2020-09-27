import React, {Component} from 'react';
import {TextInput,Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

import Button from './ortak/ButtonDesign';

import Card from './ortak/Card';


import CardSection from './ortak/CardSection';

import Spinner from './ortak/Spinner';




export default class LoginForm extends Component {//export normalde sonda idi ama böylede bir kullanımı var.Çalışıyor.
    state = {
        email:'', 
        password:'',
        loading: false
    };
    
    clickLogin()//aşağıda this  ve bu metotla butona tıklandığında email ve password üzerinde işlem yapılması sağlandı.
    {

        this.setState({loading:true});


        const {email,password}=this.state;//password ve email this.state den alınacak.

        //boş olma durumu aşağıda sorgulama yapıcam:
        if(email==='' || password==='')
        {
            this.setState({loading:false});
            Alert.alert(
                'Mesaj',
                'Her iki alanda dolu olmalıdır!',
                [
                    {
                        text:'Tamam', onPress:()=>null
                    }
                ]
            );
        }

        else
        {
       // console.log('email:'+this.state.email);
      //console.log('password:'+this.state.password);


       // auth().signInWithEmailAndPassword(this.state.email, this.state.password)-->

       auth().signInWithEmailAndPassword(email,password)
            .then(this.loginSuccess.bind(this))
      

        //eğer bir email ve password yoksa sorunu varsa catch bloğu içine girmesi sağlanır.

            .catch(()=>{

                 auth().createUserWithEmailAndPassword(email,password)//mail ve password ile user ı oluştur.
            
                    //başarılı kayıt sağlandıysa
                    .then(this.loginSuccess.bind(this))

                    //mail ve password de bir hata varsa,
                    .catch(this.loginFail.bind(this));

        });
      

    };          

 }


    loginSuccess()
    {
        console.log('başarılı giriş');
        this.setState({loading:false});
    }

    loginFail()
    {
        console.log('başarısız!! giriş yapılmadı.')

        this.setState({loading:false});//BURASI ÖNEMLİ YAZMADIĞIMDA BUTON GÖRÜNÜRLÜĞÜ GİDİYOR.

        //alert ile uyarı ekranını oluşturduk. Buradan;
        Alert.alert(
            'Mesaj',
            'Kullanıcı adı veya şifreniz hatalı!',
            [
                {
                    text:'Tamam', onPress:()=>null
                }
            ]
        );//buraya kadar.
    }

    renderButton()
    {
        //FALSE İSE;
        if (!this.state.loading)
        {
            return <Button onPress={this.clickLogin.bind(this)}>GİRİŞ</Button>;
        }

        //TRUE İSE;
        return <Spinner size="small"/>;
    }



    render() {
        return(
            <Card >
                <CardSection >

                    <TextInput
                        placeholder="E-mail"
                        style={styles.inputStyle}
                        value={this.state.email}//value ile verileri firebase e göndericez.Bunu için yukarda bilgilerin tutulduğu bir state yapısı oluşturuyoruz.
                        onChangeText={email=>this.setState({email})}//email gelen emaile eşitleniyor.
                    />

                </CardSection>

                <CardSection>

                <TextInput
                        secureTextEntry//şifre noktalı olsun.
                        placeholder="Şifre"
                        style={styles.inputStyle}
                        value={this.state.password}//value ile verileri firebase e göndericez.Bunu için yukarda bilgilerin tutulduğu bir state yapısı oluşturuyoruz.
                        onChangeText={password=>this.setState({password})}
                    />

                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = {

  
    inputStyle://uygulamada gireceğimiz input
    {
        color:'#ED4C67',
        paddingRight:5,
        paddingLeft:5,
        fontSize:18,
        lineHeight:23,
        flex:2
    }

}