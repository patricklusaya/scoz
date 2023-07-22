import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Pressable  } from 'react-native';
 class TaskItem extends Component {
  render() {
    return (
        <Pressable onPress={this.props.onDeleteTask} android_ripple={{color:'lightblue'}}>
        <Text style={styles.taskTextStyles} key={this.props.index}> {this.props.task} </Text>
        </Pressable>
    )
  }
}
const styles = StyleSheet.create({ 
    taskTextStyles:{
        backgroundColor:'#cccccc',
        borderRadius:6,
        marginTop:10,
        padding:10
      }
});
export default TaskItem;
