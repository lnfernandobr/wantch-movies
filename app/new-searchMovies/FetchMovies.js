import { Component } from "react";
import { Loading } from "../../infra/ui/components/loading";
import React from "react";

export class FetchMovies extends Component {
  state = {
    loading: false,
    page: 1
  };

  onFetchMore = () => {
    const { fetchMore } = this.props.data;

    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        console.log(this.state.page);
        fetchMore({
          variables: {
            page: this.state.page
          },
          updateQuery: (previousResult, { ...rest }) => {
            console.log("previousResult = ", previousResult);
            console.log("rest = ", rest);
          }
        });
      }
    );


  };

  render() {
    const { loading, page } = this.state;
    console.log(this.props);

    if (this.props.loading) {
      return <Loading />;
    }

    return (
      <div>
        <button onClick={this.onFetchMore}>Fetch</button>
      </div>
    );
  }
}
