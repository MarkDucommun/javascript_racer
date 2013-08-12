class Player < ActiveRecord::Base
  # Remember to create a migration!
  has_many :foos
  has_many :games, through: :foos

  validates_uniqueness_of :name
end
