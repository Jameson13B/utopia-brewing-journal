import React from 'react'
import { Link } from 'react-router-dom'

import View from '../components/shared/View'

const NotFound = porps => {
  return (
    <View style={{ textAlign: 'center' }}>
      <h1>404 Error</h1>
      <h3>Page Not Found</h3>
      <Link to="/">Back to Home</Link>
    </View>
  )
}

export default NotFound
