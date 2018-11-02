import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'
import Quiz from './containers/quiz/quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreate from './containers/QuizCreate/QuizCreate'

class App extends Component {
  render() {
    return (
        <Layout>
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/quiz-creator" component={QuizCreate} />
                <Route path="/quiz/:id" component={Quiz} />
                <Route path="/" component={QuizList} />
            </Switch>
        </Layout>
    );
  }
}

export default App;
