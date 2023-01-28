import Foundation

@objc public class Facebook: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
