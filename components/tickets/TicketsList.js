import { FlatList, ActivityIndicator } from 'react-native'
import OneTicket from './OneTicket';

const TicketsList = (props) => {
    const data = props.data ;
  
    return (
    <FlatList contentContainerStyle={{ gap: 16  }}
      data={data}
      renderItem={itemdata => <OneTicket onUpdate={() => {}}   {...itemdata.item} />}
      keyExtractor={(item, index) => String(index)}
      initialNumToRender = {3}
      onEndReachedThreshold = {0.1}
      onEndReached={props.loadMore}
      ListFooterComponent={props.loading && <ActivityIndicator />}  
    />
  )
}

export default TicketsList