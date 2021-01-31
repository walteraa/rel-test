# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GitNode, type: :model do
  context 'valid node' do
    it { expect(described_class.new(id: '1', timestamp: '2123145', message: Faker::Movies::StarWars.quote)).to be_valid }
    it { expect(described_class.new(id: '1', timestamp: '2123145', message: nil)).to be_valid }
  end
  context 'invalid node' do
    it { expect(described_class.new(id: nil, timestamp: '2123145', message: Faker::Movies::StarWars.quote)).to_not be_valid }
    it { expect(described_class.new(id: '1', timestamp: nil, message: Faker::Movies::StarWars.quote)).to_not be_valid }
    it { expect(described_class.new(id: nil, timestamp: nil, message: Faker::Movies::StarWars.quote)).to_not be_valid }
  end
end

