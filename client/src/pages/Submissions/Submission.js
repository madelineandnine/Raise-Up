
// Libraries
import React, { Component } from 'react';
import API from '../../utils/API';
import Moment from 'react-moment';


// Components
import { Container } from '../../components/Grid';
import { List } from '../../components/List/List';
import { ListItem } from '../../components/List/ListItem';
//import { Button } from 'semantic-ui-react';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
} from 'react-share';
import { FacebookIcon, TwitterIcon, RedditIcon } from 'react-share';
import StyledSubNav from '../../components/SubNav/SubNav';
import ExpandModal from '../../components/ExpandModal';


// Creates/exports 'Submissions' as stateful component with empty array
export default class Submissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: [],
      topic: '',
      pullquote: '',
      language: '',
      date: '',
    };
  }
  

  // Uses API to get data from database and fill empty array
  componentDidMount() {
    API.getSubmissions().then(res => {
      console.log(res.data);
      const submission = res.data;
      this.setState({ submission });
      console.log({ submission });
    });
  }

  handleTopicSelect = (event, { result }) => {
    API.getSubmissionsByTopic(result.title).then((res) => {
      this.setState({ submission: res.data });
    });
  };


  // Renders database as list on page with social media share buttons
  render() {
    return (
      <Container fluid>
       <StyledSubNav onResultSelect={this.handleTopicSelect} />
        {/* <SubNav onResultSelect={this.handleTopicSelect} /> */}
        <List>
          {this.state.submission.map(submission => (
            <ListItem
              key={submission._id}
              _id={submission._id}
            >
              <h2 className="whiteText"> A Story About: {submission.topic} </h2>
              <h1>
                {' '}
                <strong> " </strong> {submission.pullquote} <strong> " </strong>
              </h1>

    
              <h4> Date Published: <Moment format="MM-DD-YYYY">{submission.date}</Moment> </h4>
              <div className="inlineButtons">
                <FacebookShareButton
                  className="shareButtons"
                  url="https://greve-bastille-92738.herokuapp.com/api/submissions"
                  quote={submission.topic}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                  className="shareButtons"
                  url="https://greve-bastille-92738.herokuapp.com/api/submissions"
                  quote={submission.topic}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>

                <RedditShareButton
                  className="shareButtons"
                  url="https://greve-bastille-92738.herokuapp.com/api/submissions"
                  quote={submission.topic}
                >
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
 
                  <ExpandModal submission={submission} />
              </div>
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}
