class Player < ActiveRecord::Base
  # Remember to create a migration!
  has_many :foos
  has_many :games, through: :foos

  validates_uniqueness_of :name

  def won
    self.games.where(winner_id: self.id)
  end

  def add_win
    self.wins += 1
    self.save
  end
end
