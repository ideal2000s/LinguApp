# frozen_string_literal: true

class SubdomainConstraint
  attr_accessor :subdomains

  def initialize(*subdomains)
    self.subdomains = subdomains
  end

  def matches?(request)
    subdomains.any? { |subdomain| request.subdomain.match?(matching_rule(subdomain)) }
  end

  private

  def matching_rule(subdomain)
    Regexp.new("(www.)?#{subdomain}")
  end
end
