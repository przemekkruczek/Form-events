import React from 'react';
import categories from './mocks/categories';
import employes from './mocks/employes';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {formatDate, parseDate} from "react-day-picker/moment";

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            title: '',
            description: '',
            counter: 0,
            category: 'Select category',
            categoryId: 0,
            paid_event: 'false',
            fee: '',
            reward: '',
            responsible: '',
            coordinatorId: 0,
            email: '',
            date: '',
            time: '',
            time12h: 'AM',
            duration: '',
            errors: [],
            errorstyle: {
                borderColor: '#CDCDCD',
            },
            errorstyle_text: {
                color: '#355990',
            },
            success: false,
        };

        // *** user with id 3, always on top:
        let id = 3;
        employes.unshift(employes.splice(id, 1)[0]);
    };
        
    handleChangeTitle = e => {
        this.setState({
            title: e.target.value,
        })
    };
    handleChangeDescription = e => {
        this.setState({
            description: e.target.value,
            counter: e.target.value.length,
        })
    };
    handleChangeCategory = e => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({
            category: e.target.value,
            categoryId: parseInt(e.target.options[selectedIndex].getAttribute('data-key')),
        });
    };
    handleChangePayment = e => {
        this.setState({
            paid_event: e.target.value,
        })    
    };
    handleChangeReward = e => {
        this.setState({
            reward: e.target.value,
        })
    };
    handleChangeResponsible = e => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({
            responsible: e.target.value,
            coordinatorId: parseInt(e.target.options[selectedIndex].getAttribute('data-key')),
        })
    };
    handleChangeEmail = e => {
        this.setState({
            email: e.target.value,
        })
    };
    handleChangeDate = day => {
        this.setState({
            date: day,
        })
    };
    handleChangeTime = e => {
        this.setState({
            time: e.target.value,
        })
    };
    handleChangeTime12h = e => {
        this.setState({
            time12h: e.target.value,
        })
    };
    handleChangeFee = e => {
        this.setState({
            fee: e.target.value,
        })
    };
    handleChangeDuration = e => {
        this.setState({
            duration: e.target.value,
        })
    };
    handleSubmit = e => {
        e.preventDefault();

        // *** function to convert date:
        function convertDate(str) {
            const mnths = {Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06", Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"},
            date = str.split(" ");
            return [ date[3], mnths[date[1]], date[2] ].join("-");
        };

        // *** function to convert time:
        const time12h = this.state.time12h;
        const timeSet = this.state.time;
        const timeArray = timeSet.split(':');
        function convertTime(str) {
            if(time12h === 'PM') {
                if(parseInt(timeArray[0],10) == 12){
                    const hour = '12';
                    const min = timeArray[1];
                    return hour + ':' + min;
                }else{
                    const hour = 12 + parseInt(timeArray[0],10);
                    const min = timeArray[1];
                    return hour + ':' + min;
                }     
            }else{
                if(parseInt(timeArray[0],10) == 12){
                    const hour = '00';
                    const min = timeArray[1];
                    return hour + ':' + min;
                }else{
                    const hour = parseInt(timeArray[0],10);
                    const min = timeArray[1];
                    return hour + ':' + min;
                }
            }
        };

        // *** validation form and adding errors:   
        const { title, description, responsible, date, time, fee, paid_event, email } = this.state;
        function handleValidation(title, description, responsible, date, time, fee, paid_event, email) {
            const errors = [];
            if (title.length === 0) {
                errors[0] = ('Title cannot be empty');
            }
            if (description.length === 0) {
                errors[1] = ('Description cannot be empty');
            }
            if (date.length === 0) {
                errors[3] = ('Date cannot be empty');
            }
            if (time.length === 0) {
                errors[4] = ('Time cannot be empty');
            }
            if (fee.length === 0 && paid_event === 'true') {
                errors[5] = ('Fee cannot be empty');
            }
            if (email.length < 5) {
                errors[6] = ('Email should be at least 5 charcters long, contain a @ and at least one dot');
            }
            if (email.split('').filter(x => x === '@').length !== 1) {
                errors[6] = ('Email should be at least 5 charcters long, contain a @ and at least one dot');
            }
            if (email.indexOf('.') === -1) {
                errors[6] = ('Email should be at least 5 charcters long, contain a @ and at least one dot');
            }
            return errors;
        }
        const errors = handleValidation(title, description, responsible, date, time, fee, paid_event, email);
        const checkErrors = [...errors];

        if (errors.length > 0) {
            this.setState({
                errors,
                errorstyle: {
                    borderColor: '#FFB2B2',
                },
                errorstyle_text: {
                    color: '#FFB2B2'
                }
            });
            return;
        };

        if(checkErrors.length == 0) {
            this.setState({success: true});

            // *** object with proper data from form:
            const dataForm = { 
                title: this.state.title,
                description: this.state.description,
                category_id: this.state.categoryId,
                paid_event: (this.state.paid_event =="true"),
                event_fee: parseInt(this.state.fee),
                reward: parseInt(this.state.reward),
                date: convertDate(`${this.state.date}`) + 'T' + convertTime(this.state.time12h),
                duration: parseInt(this.state.duration) * 3600,
                coordinator: {
                    email: this.state.email,
                    id: this.state.coordinatorId,
                },
            };
            console.log(dataForm);
        }
        
    };
    render() {
        const { errors } = this.state;
        return (    
            <div>
                <form onSubmit={this.handleSubmit} className={this.state.success ? 'null' : 'form'}>
                    <section className='about'>
                        <div className="about__title">
                            <h1 className="about__title-header">About</h1>
                        </div>
                        <div className='about__content'>
                            <div className='about__content-title'>
                                <label className='label-title' style={errors[0] !== 'Title cannot be empty' ? {} : this.state.errorstyle_text } htmlFor='title'>TITLE<span className='label-star'> *</span></label>
                                <input type='text' id='title' style={errors[0] !== 'Title cannot be empty' ? {} : this.state.errorstyle } className='input-title' value={this.state.title} onChange={this.handleChangeTitle} placeholder="Make it short and clear" />
                                {errors[0] !== 'Title cannot be empty' ? '' : <div className='errorTitle'><p>{errors[0]}</p></div>}
                            </div>
                            <div className='about__content-description'>
                                <label className='label-description' style={errors[1] !== 'Description cannot be empty' ? {} : this.state.errorstyle_text } htmlFor='description'>DESCRIPTION<span className='label-star'> *</span></label>
                                <textarea type='text' id='description' style={errors[1] !== 'Description cannot be empty' ? {} : this.state.errorstyle } maxLength="140" className='textarea-description' value={this.state.description} onChange={this.handleChangeDescription} placeholder="Write about your event, be creative" /> {errors[1] !== 'Description cannot be empty' ? '' : <div className='errorTitle'><p>{errors[1]}</p></div>}
                            </div>
                            <div className='about__content-descriptionCounter'>
                                <p>Max length 140 characters</p>
                                <p>{this.state.counter}/140</p>
                            </div>
                            <div className='about__content-category'>
                                <label className='label-category' htmlFor='category'>CATEGORY</label>
                                <select className='select-category' value={this.state.category} onChange={this.handleChangeCategory}><option className='select-option' value="Select category" disabled>Select category</option>{categories.map((element) => <option className='select-option-categories' key={element.id} data-key={element.id} value={element.name}>{element.name}</option>)}</select>
                            </div>
                            <div className='about__content-descriptionCategory'>
                                <p>Describes topic and people who should be interested in this event</p>
                            </div>
                            <div className='about__content-payment'>
                                <label className='label-payment' style={errors[5] !== 'Fee cannot be empty' ? {} : this.state.errorstyle_text } htmlFor='payment'>PAYMENT</label>
                                <label className='label-radio'>Free event
                                    <input type='radio' id='payment' className='input-payment' value='false' checked={this.state.paid_event === 'false'} onChange={this.handleChangePayment}/>
                                    <span className='circle'></span>
                                </label>
                                <label className='label-radio'>Paid event
                                    <input type='radio' id='payment' className='input-payment' value='true' checked={this.state.paid_event === 'true'} onChange={this.handleChangePayment}/>
                                    <span className='circle'></span>
                                </label>
                                {this.state.paid_event === 'true' ? <div><input type='text' id='reward' className='input-reward' style={errors[5] !== 'Fee cannot be empty' ? {} : this.state.errorstyle } value={this.state.fee} onChange={this.handleChangeFee}placeholder="Fee"/>$</div> : ''}
                                {errors[5] !== 'Fee cannot be empty' ? '' : <div className='errorTitle'><p>{errors[5]}</p></div>}
                            </div>
                            <div className='about__content-reward'>
                                <label className='label-reward' htmlFor='reward'>REWARD</label>
                                <input type='text' id='reward' className='input-reward' value={this.state.reward} onChange={this.handleChangeReward}placeholder="Number"/>
                                <p>reward points for attendance</p>
                            </div>
                        </div>
                    </section>
                    <section className='coordinator'>
                        <div className="coordinator__title">
                            <h1 className="coordinator__title-header">Coordinator</h1>
                        </div>
                        <div className='coordinator__content'>
                            <div className='coordinator__content-category'>
                                    <label className='label-category' htmlFor='category'>RESPONSIBLE<span className='label-star'> *</span></label>
                                    <select className='select-category' value={this.state.responsible} onChange={this.handleChangeResponsible}>
                                    {employes.map((element) => <option className='select-option-categories' key={element.id} data-key={element.id} value={element.name}>{element.id == 3 ? 'Me :' : ''} {element.name} {element.lastname}</option>)}
                                    </select> 
                            </div>
                            <div className='coordinator__content-email'>
                                <label className='label-email' style={errors[6] !== 'Email should be at least 5 charcters long, contain a @ and at least one dot' ? {} : this.state.errorstyle_text } htmlFor='email'>EMAIL</label>
                                <input type='email' id='email' style={errors[6] !== 'Email should be at least 5 charcters long, contain a @ and at least one dot' ? {} : this.state.errorstyle } className='input-email' value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email"/>
                                {errors[6] !== 'Email should be at least 5 charcters long, contain a @ and at least one dot' ? '' : <div className='errorTitle'><p>{errors[6]}</p></div>}
                            </div>
                        </div>
                    </section>
                    <section className='when'>
                        <div className="when__title">
                            <h1 className="when__title-header">When</h1>
                        </div>
                        <div className='when__content'>
                            <div className='when__content-date'>
                                <label className='label-date' style={errors[3] !== 'Date cannot be empty' ? {} : this.state.errorstyle_text } style={errors[4] !== 'Time cannot be empty' ? {} : this.state.errorstyle_text } htmlFor='date'>STARTS ON<span className='label-star'> *</span></label>
                                <DayPickerInput id='date' style={errors[3] !== 'Date cannot be empty' ? {} : this.state.errorstyle } formatDate={formatDate} parseDate={parseDate} placeholder="dd/mm/yyyy" onDayChange={this.handleChangeDate} dayPickerProps={{ disabledDays: {before: new Date()} }}/>
                                {errors[3] !== 'Date cannot be empty' ? '' : <div className='errorDate'><p>{errors[3]}</p></div>}
                                <p>at</p>
                                <input type='time' className='input-time' style={errors[4] !== 'Time cannot be empty' ? {} : this.state.errorstyle } min='01:00' max='12:00' onChange={this.handleChangeTime}/>
                                <label className='label-radio'>AM
                                    <input type='radio' id='AM' className='input-time12h' value='AM' checked={this.state.time12h === 'AM'} onChange={this.handleChangeTime12h} />
                                    <span className='circle'></span>
                                </label>
                                <label className='label-radio'>PM
                                    <input type='radio' id='PM' className='input-time12h' value='PM' checked={this.state.time12h === 'PM'} onChange={this.handleChangeTime12h} />
                                    <span className='circle'></span>
                                </label>
                                {errors[4] !== 'Time cannot be empty' ? '' : <div className='errorDate'><p>{errors[4]}</p></div>}
                            </div>
                            <div className='when__content-duration'>
                                <label className='label-duration' htmlFor='duration'>DURATION</label>
                                <input type='text' id='duration' className='input-duration' value={this.state.duration} onChange={this.handleChangeDuration} placeholder="Number" />
                                <p>hour</p>
                            </div>
                        </div>
                    </section>
                    <input className="btn_box" type="submit" value="PUBLISH EVENT" />
                </form>
                <div className={this.state.success ? 'success' : 'null'}>
                    <div className='success__container'>
                        <h2 className='success__container-header'>Success</h2>
                        <p className='success__container-message'>Event has been created</p>
                    </div>
                </div>
            </div>
        )
    }
}