import React, {Fragment, PureComponent} from 'react';
import { Text, TouchableOpacity, ActivityIndicator, FlatList, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { selectArticlesIds, isArticlesIdsLoading, isArticleLoading, selectArticlesObjects } from '../store/articlesReducer';
import { fetchArticlesIds, fetchArticles } from '../store/actions';

class MainScreen extends PureComponent {
  componentDidMount() {
    this.props.fetchArticlesIds();
  }

  goToDetails = item => {
    this.props.navigation.navigate({
      routeName: 'Details',
      params: {
        ...item
      }
    });
  };

  handleScroll = e => {
    if (
      e.nativeEvent.layoutMeasurement.height +
      e.nativeEvent.contentOffset.y >=
      e.nativeEvent.contentSize.height
    ) {
      console.log('load more articles');
    }
  };

  render() {
    const { isArticlesIdsLoading, isArticleLoading, articlesObjects } = this.props;
    return (
      <Fragment>
        <Image
          source={{uri: 'https://picsum.photos/1000/500'}}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width/2
          }}
          resizeMode="cover"
        />
        {articlesObjects.length > 0 && (
          <FlatList
            keyExtractor={({ id }, index) => `${index}.${id}`}
            data={articlesObjects}
            renderItem={({item}) => (
              <View
                style={{
                  borderBottomWidth: 1,
                  padding: 10
                }}
              >
                <TouchableOpacity
                  onPress={() => this.goToDetails(item)}
                >
                  <Text style={{ fontSize: 16 }}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            onScroll={this.handleScroll}
          />
        )}
        {isArticlesIdsLoading || isArticleLoading ? <ActivityIndicator/> : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  articlesIds: selectArticlesIds(state),
  isArticlesIdsLoading: isArticlesIdsLoading(state),
  isArticleLoading: isArticleLoading(state),
  articlesObjects: selectArticlesObjects(state),
});

const mapDispatchToProps = {
  fetchArticlesIds,
  fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
