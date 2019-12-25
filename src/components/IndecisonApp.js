import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import Addoption from './Addoption';
import OptionModal from './OptionModal';
class IndecisionApp extends React.Component {
    state = {
        options : [],
        selectedOption: undefined
    };
    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(()=>({options}))
            } 
        } catch(e){

        } 
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !==this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    handleAddOption=(option)=>{
        if(!option){
            return 'Enter Valid text';
        } else if(this.state.options.indexOf(option)>-1){
            return 'Element Already Exists';
        }
        this.setState((prevState)=>{
            return {
                options: prevState.options.concat(option)
            };
        })
    };
    handleRemoveOption=(optionToRemove)=>{
        this.setState((prevState)=>{
            return {
                options : prevState.options.filter((option)=>{
                    return optionToRemove !==option;
                })
            }
        })
    };
    handlePick=()=>{
        const random = Math.floor(Math.random() * this.state.options.length);
        let option = this.state.options[random];
        this.setState(()=>{
            return {
                selectedOption : option
            }
        });
    };
    handleReamoveAll=()=>{
        this.setState(()=>{
            return {
                options : []
            }
        });
    };
    clearModal=()=>{
        this.setState(()=>{
            return {
                selectedOption: undefined
            }
        })
    }
    render(){
        const title = "Indecision";
        const subtitle = "Your life in hands of comp";
        return (
        <div>
            <Header title = {title} subtitle={subtitle}/>
            <div className="container">
            <Action  removeOption = {this.state.options.length > 0} handlePick={this.handlePick}/>
            <div className="widget">
            <Options handleReamoveAll={this.handleReamoveAll} options = {this.state.options} handleRemoveOption={this.handleRemoveOption} />
            <Addoption handleAddOption = {this.handleAddOption} />
            </div>
            
            {/* <OptionalModal /> */}
            <OptionModal selectedOption={this.state.selectedOption} clearModal={this.clearModal}/>

            </div>

        </div>);
    }
};
export default IndecisionApp;