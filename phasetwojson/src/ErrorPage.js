import React from 'react'
import { Container, Header, Icon, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function ErrorPage() {
  return (
    <Container textAlign="center" style={{ marginTop: '5rem' }}>
      <Header as="h1" icon>
        <Icon name="frown outline" />
        404 Error
        <Header.Subheader>Page Not Found</Header.Subheader>
      </Header>
      <p>We couldn't find the page you were looking for. Please check the URL and try again.</p>
      <Button primary onClick={() => window.history.back()}>
        Go Back
      </Button>
    </Container>
  )
}

export default ErrorPage
