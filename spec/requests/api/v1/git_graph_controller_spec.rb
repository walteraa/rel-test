require 'rails_helper'

RSpec.describe Api::V1::GitGraphController, type: :request do
  let(:response_json) { JSON.parse(response.body)}
  describe 'GET #index' do
    context 'empty commit logs' do
      before { allow(Git::ClientWrapper).to receive(:log_nodes).and_return([]) }
      before { get '/api/v1/git_graph.json' }
      it { expect(response).to have_http_status(:ok) }
      it { expect(response_json['git_graph']).not_to be_empty }
      it { expect(response_json['git_graph']['nodes']).to be_empty }
      it { expect(response_json['git_graph']['edges']).to be_empty }
    end

    context 'non-empty commit logs' do
      let(:log_list) do
        [
          {"hash"=>"3", "parents_hash"=>"2", "timestamp"=>"1600278104", "message"=>Faker::Movies::StarWars.quote},
          {"hash"=>"2", "parents_hash"=>"1", "timestamp"=>"1600278043", "message"=>Faker::Movies::StarWars.quote},
          {"hash"=>"1", "parents_hash"=>"", "timestamp"=>"1600278016", "message"=>Faker::Movies::StarWars.quote}
        ]
      end
      before { allow(Git::ClientWrapper).to receive(:log_nodes).and_return(log_list) }
      before { get '/api/v1/git_graph.json' }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response_json['git_graph']['nodes'].count).to be(3) }
      it { expect(response_json['git_graph']['edges'].count).to be(2) }
    end
  end
end