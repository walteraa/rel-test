# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GitGraph, type: :model do
  let(:nodes) do
    [
      {"hash"=>"3", "parents_hash"=>"2", "timestamp"=>"1600278104", "message"=>Faker::Movies::StarWars.quote },
      {"hash"=>"2", "parents_hash"=>"1", "timestamp"=>"1600278043", "message"=>Faker::Movies::StarWars.quote },
      {"hash"=>"1", "parents_hash"=>"", "timestamp"=>"1600278016", "message"=>Faker::Movies::StarWars.quote }
    ]
  end
  let(:edges) do
    [
      { 'source' => '1', 'target' => '2'},
      { 'source' => '2', 'target' => '3'}
    ]
  end
  context 'valid graph' do
    it { expect(described_class.new(nodes: nodes, edges: edges)).to be_valid }
  end
  context 'invalid graph' do
    it { expect(described_class.new(nodes: nodes, edges: nil)).to_not be_valid }
    it { expect(described_class.new(nodes: nodes, edges: [])).to_not be_valid }
    it { expect(described_class.new(nodes: nil, edges: edges)).to_not be_valid }
    it { expect(described_class.new(nodes: [], edges: edges)).to_not be_valid }
  end
end


