import React, {Component} from 'react'
import classes from './QuizCreate.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/input'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Select from '../../components/UI/Select/Select'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

function createOptionControl(number){
    return createControl({
        label: `Вариан ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
        }, 
        {requaired: true
    })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {
            requaired: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreate extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls, 
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    selectChangehandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
const select = <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangehandler}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ]}
        />

        return (
            <div className={classes.QuizCreate}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}

                        { select }
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            >Добавить вопрос</Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            >Создать тест</Button>

                    </form>
                </div>
            </div>
        )
    }
}