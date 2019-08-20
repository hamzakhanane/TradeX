# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  session_token   :string           not null
#  buying_power    :float            not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest,:first_name, :buying_power, :last_name, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :watch_list,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "WatchList"
  
  has_many :portfolio,
      primary_key: :id,
      foreign_key: :user_id,
      class_name: "Portfolio"

  has_many :transactions,
      primary_key: :id,
      foreign_key: :user_id,
      class_name: "Transaction"


  

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def is_password?(password)
    bcrypt_password = BCrypt::Password.new(self.password_digest)
    bcrypt_password.is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.update!(session_token: User.generate_session_token)
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

 

end
