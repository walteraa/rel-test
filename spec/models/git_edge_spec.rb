# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GitEdge, type: :model do
  context 'valid edge' do
    it { expect(described_class.new(source: '1', target: '2')).to be_valid}
  end
  context 'invalid edge' do
    it { expect(described_class.new(source: '1', target: nil)).to_not be_valid }
    it { expect(described_class.new(source: nil, target: '2')).to_not be_valid }
    it { expect(described_class.new(source: nil, target: nil)).to_not be_valid }
  end
end
