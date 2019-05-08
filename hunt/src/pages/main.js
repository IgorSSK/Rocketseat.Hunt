import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../services/api';
import { bold } from 'ansi-colors';

class Main extends Component{

    state = {
        docs : [],
        productInfo:[],
        page:1
    };

    static navigationOptions ={
        title: 'JSHunt'
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data;
        this.setState({ docs: [...this.state.docs, ...docs], page, productInfo });
    }

    loadMoreProducts = () => {
        const {page, productInfo} = this.state;

        if(page === productInfo.pages) return;

        const pageNum = page + 1;

        this.loadProducts(pageNum)
    }

    renderItem = ({ item }) => (
        <View style={ styles.productContainer }>
            <Text style={ styles.contentTitle }>{ item.title }</Text>
            <Text style={ styles.contentDescription }>{ item.description }</Text>

            <TouchableOpacity 
                style={ styles.contentButton } 
                onPress={ () => this.props.navigation.navigate("Product", { product: item }) }>
                <Text style={ styles.contentButtonText }>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    render(){
        return(
            <View style={ styles.container }>
                <FlatList
                    contentContainerStyle = { styles.list }
                    data = { this.state.docs }
                    keyExtractor = { item => item._id }
                    renderItem = { this.renderItem }
                    onEndReached = { this.loadMoreProducts }
                    onEndReachedThreshold = '0.5'
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FAFAFA"
    },

    list:{
        padding:20
    },

    productContainer:{
        padding:20,
        borderRadius:5,
        borderWidth:1,
        borderColor:"#DDD",
        backgroundColor:"#FFFF",
        marginBottom:20

    },

    contentTitle:{
        fontSize:18,
        fontWeight:"bold",
        color:"black"
    },

    contentDescription:{
        fontSize:14,
        marginTop:10,
        lineHeight:20,
        color:"#9999"
    },

    contentButton:{
        marginTop:10,
        height:50,
        borderWidth:1,
        backgroundColor:"transparent",
        borderRadius:100,
        borderColor:"#20639B",
        justifyContent:"center",
        alignItems:"center"
    },

    contentButtonText:{
        color:"#20639B",
        fontWeight:"bold"
    }
});

export default Main;